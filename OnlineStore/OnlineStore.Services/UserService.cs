using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using OnlineStore.Dto;
using OnlineStore.Models.Models;
using OnlineStore.Repository.Interfaces;
using OnlineStore.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IAuthService _authService;
        private readonly IUserRepository _userRepository;
        private readonly IConfigurationSection _secretKey;
        private readonly IEmailService _emailservice;


        public UserService(IUserRepository userRepository, IMapper mapper, IConfiguration configuration, IAuthService authService, IEmailService emailservice)
        {
            _mapper = mapper;
            _authService = authService;
            _userRepository = userRepository;
            _secretKey = configuration.GetSection("SecretKey");
            _emailservice = emailservice;
        }

        public UserUpdateDto AddUser(UserDto userDto)
        {
            User user = _mapper.Map<User>(userDto);

            if (_userRepository.FindUser(userDto.Username) != null)
            {
                return null;
            }

            if (userDto.UserType == "Admin")
            {
                user.UserType = Models.Enums.UserType.Admin;
            }
            if (userDto.UserType == "Customer")
            {
                user.UserType = Models.Enums.UserType.Customer;
            }
            if (userDto.UserType == "Merchant")
            {
                user.UserType = Models.Enums.UserType.Merchant;
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            User u = _userRepository.Add(user);
            return new UserUpdateDto { Username = u.Username, Address = u.Address, DateOfBirth = u.DateOfBirth, Email = u.Email, FirstName = u.FirstName, LastName = u.LastName, UserImage = u.ImageUrl, Password = u.Password, UserType = u.UserType.ToString() };
        }

        public async Task<bool> UploadImage(IFormFile imageFile, Guid id)
        {
            try
            {
                var t = Path.GetExtension(imageFile.FileName);
                var tt = id.ToString();
                var filePath = Path.Combine("Images", id.ToString() + Path.GetExtension(imageFile.FileName));
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

        public UserUpdateDto GetUser(Guid id)
        {

            User u = _userRepository.FindById(id);
            if (u == null)
                return null;
            else
            {
                return new UserUpdateDto { Username = u.Username, Address = u.Address, DateOfBirth = u.DateOfBirth, Email = u.Email, FirstName = u.FirstName, LastName = u.LastName, UserImage = u.ImageUrl, Password = u.Password, UserType = u.Username.ToString() };
            }
        }

        public byte[] GetImage(Guid id)
        {
            try
            {
                UserUpdateDto userUpdateDto = GetUser(id);
                string fileName = userUpdateDto.UserImage.Split("\\")[0];
                var path = Path.Combine("Images", id.ToString() + ".png");
                var imageBytes = File.ReadAllBytes(path);
                return imageBytes;
            }
            catch
            {
                return new byte[0];
            }
        }

        public UserUpdateDto UpdateUser(UserUpdateDto dto)
        {

            User user = _userRepository.FindUser(dto.Username);
            if (user == null)
                return null;
            user.Username = dto.Username;
            user.FirstName = dto.FirstName;
            user.LastName = dto.LastName;
            user.Address = dto.Address;
            user.Email = dto.Email;
            user.DateOfBirth = dto.DateOfBirth;
            user.ImageUrl = dto.UserImage;
            if (dto.Password != "")
            {
                user.Password = dto.Password;
            }
            User u = _userRepository.UpdateUser(user);
            if (u == null)
                return null;
            else
            {
                //id na kraju mozda
                return new UserUpdateDto { Username = u.Username, Address = u.Address, DateOfBirth = u.DateOfBirth, Email = u.Email, FirstName = u.FirstName, UserImage = u.ImageUrl, Password = u.Password, UserType = u.UserType.ToString() };
            }
        }

        public string Login(UserLoginDto dto)
        {
            User user = new User { Username = dto.Username, Password = dto.Password };


            user = _userRepository.FindUser(user.Username);
            if (user == null)
                return null;

            if (BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))//Uporedjujemo hes pasvorda iz baze i unetog pasvorda
            {
                List<Claim> claims = new List<Claim>();

                if (user.UserType == Models.Enums.UserType.Admin)
                    claims.Add(new Claim(ClaimTypes.Role, "Admin")); //Add user type to claim
                else if (user.UserType == Models.Enums.UserType.Merchant)
                    claims.Add(new Claim(ClaimTypes.Role, "Merchant"));
                else if (user.UserType == Models.Enums.UserType.Customer)
                    claims.Add(new Claim(ClaimTypes.Role, "Customer"));


                claims.Add(new Claim(ClaimTypes.Role, "user"));

                SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:49670", //url servera koji je izdao token
                    claims: claims, //claimovi
                    expires: DateTime.Now.AddMinutes(7), //vazenje tokena u minutama
                    signingCredentials: signinCredentials //kredencijali za potpis
                );
                string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return tokenString;
            }
            else
            {
                return null;
            }
        }
        public async Task<AuthDto> FacebookLogin(FacebookTokenDto fbTokenDto)
        {
            FacebookInfoDto socialInfo = await _authService.VerifyFacebookTokenAsync(fbTokenDto);

            if (socialInfo == null)
                return null;
            User user = _userRepository.FindByEmail(socialInfo.Email);
            if (user == null)
            {
                user = new User()
                {
                    Email = socialInfo.Email,
                    Username = socialInfo.Email.Substring(0, socialInfo.Email.IndexOf("@")),
                    FirstName = socialInfo.Name,
                    LastName = socialInfo.LastName,
                    Password = socialInfo.ID,
                    DateOfBirth = DateTime.Now, //Because user might have made this data private on account
                    UserType = Models.Enums.UserType.Customer,
                    Address = socialInfo.Address ?? "address",
                    ImageUrl = socialInfo.Picture ?? "noPicture"
                };


                _userRepository.Add(user);

            }

            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Role, "Customer"));
            claims.Add(new Claim(ClaimTypes.Role, "user"));

            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "http://localhost:49670", //url servera koji je izdao token
                claims: claims, //claimovi
                expires: DateTime.Now.AddYears(1), //vazenje tokena u minutama
                signingCredentials: signinCredentials //kredencijali za potpis
            );
            string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            AuthDto authResponse = new AuthDto()
            {
                ID = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Address = user.Address,
                Picture = user.ImageUrl

            };
            return authResponse;

        }

        public UserLoginDto Verify(UserUpdateDto userUpdateDto)
        {
            User user = new User { Username = userUpdateDto.Username, Password = userUpdateDto.Password };


            user = _userRepository.FindUser(user.Username);
            if (user != null)
            {
                _emailservice.SendEmail(userUpdateDto.Email, "VERIFICATE", "You are successufully verificated!");

                user.VerificationStatus = Models.Enums.VerificationStatus.Accepted;
                User u = _userRepository.SaveVerificationStatus(user);
                if (u == null)
                    return null;
                else
                {
                    return new UserLoginDto { Username = u.Username, Password = u.Password };
                }
            }
            else
                return null;
        }

        public List<UserUpdateDto> GetUnverifiedMerchants()
        {
            List<UserUpdateDto> userDtos = new List<UserUpdateDto>();
            foreach (User u in _userRepository.GetAllUsers())
            {
                if (u.VerificationStatus == Models.Enums.VerificationStatus.Pending && u.UserType == Models.Enums.UserType.Merchant)
                {
                    UserUpdateDto user = new UserUpdateDto { Username = u.Username, Address = u.Address, DateOfBirth = u.DateOfBirth, Email = u.Email, FirstName = u.FirstName, LastName = u.LastName, UserImage = u.ImageUrl, Password = u.Password, UserType = u.UserType.ToString() };
                    userDtos.Add(user);
                }
            }
            return userDtos;
        }


    }

}

