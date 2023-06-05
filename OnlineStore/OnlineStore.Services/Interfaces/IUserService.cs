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
        Task<UserUpdateDto> AddUser(UserDto newUser);
        string Login(UserLoginDto dto);
        UserUpdateDto UpdateUser(UserUpdateDto dto);
        Task<AuthDto> FacebookLogin(FacebookTokenDto tokenDto);
        UserLoginDto Verify(UserUpdateDto userUpdateDto);
        //UserEditDto GetUser(long id);
        List<UserUpdateDto> GetUnverifiedMerchants();
        //void Remove(UserEditDto user);
        //Task<bool> UploadImage(IFormFile image, int id);
        //byte[] GetImage(int id);
    }
}
