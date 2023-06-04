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
        //UserLoginDto Verificate(UserEditDto userLoginDto);
        //UserEditDto GetUser(long id);
        //List<UserEditDto> GetRequests();
        //void Remove(UserEditDto user);
        //Task<LoginResponseDto> LoginExternal(ExternalRegister userInfo);
        //Task<bool> UploadImage(IFormFile image, int id);
        //byte[] GetImage(int id);
    }
}
