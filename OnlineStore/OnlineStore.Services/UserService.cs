using OnlineStore.Dto;
using OnlineStore.Models.Models;
using OnlineStore.Repository.Interfaces;
using OnlineStore.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserUpdateDto AddUser(UserDto dto)
        {
            //if (_userRepository.Find(new User { Username = dto.Username }) != null)
            //{
            //    return null;
            //}
            //if (_userRepository.FindEmail(new User { Email = dto.Email }) != null)
            //{
            //    return null;
            //}
            User user = new User { Username = dto.Username, Address = dto.Address, DateOfBirth = dto.DateOfBirth, Email = dto.Email, FirstName = dto.FirstName, ImageUrl = dto.Image, Password = dto.Password };
            if (dto.Role == "ADMINISTRATOR")
            {
                user.Type = Models.Enums.UserType.Admin;
                //user.Verificated = true;
            }
            //if (dto.TypeOfUser == "KUPAC")
            //{
            //    user.TypeOfUser = Enums.UserType.KUPAC;
            //    user.Verificated = true;
            //}
            //if (dto.TypeOfUser == "PRODAVAC")
            //{
            //    user.TypeOfUser = Enums.UserType.PRODAVAC;
            //    user.Verificated = false;
            //}
            User u = _userRepository.Add(user);
            return new UserUpdateDto { Username = u.Username, Address = u.Address, DateOfBirth = u.DateOfBirth, Email = u.Email, FirstName = u.FirstName, UserImage = u.ImageUrl, Password = u.Password, UserType = u.Type.ToString() };
        }
    }
}
