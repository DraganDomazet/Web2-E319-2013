using AutoMapper;
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
        private readonly IUserRepository _userRepository;
        private readonly IConfigurationSection _secretKey;

        public UserService(IUserRepository userRepository, IMapper mapper, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _secretKey = configuration.GetSection("SecretKey");
            _mapper = mapper;
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
                    issuer: "http://localhost:44398", //url servera koji je izdao token
                    claims: claims, //claimovi
                    expires: DateTime.Now.AddYears(1), //vazenje tokena u minutama
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

    }

}

