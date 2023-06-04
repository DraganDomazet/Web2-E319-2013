using OnlineStore.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Services.Interfaces
{
    public interface IUserService
    {
        UserUpdateDto AddUser(UserDto newUser);
        string Login(UserLoginDto dto);
        UserUpdateDto UpdateUser(UserUpdateDto dto);
        Task<AuthDto> FacebookRegisterAndLogin(FacebookTokenDto tokenDto);
        //UserLoginDto Verificate(UserEditDto userLoginDto);
        //UserEditDto GetUser(long id);
        //List<UserEditDto> GetRequests();
        //void Remove(UserEditDto user);
        //Task<bool> UploadImage(IFormFile image, int id);
        //byte[] GetImage(int id);
    }
}
