using Microsoft.AspNetCore.Http;
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
        UserUpdateDto AddUser(UserDto userDto);
        AuthDto Login(UserLoginDto dto);
        UserUpdateDto UpdateUser(UserUpdateDto dto);
        Task<AuthDto> FacebookLogin(FacebookTokenDto tokenDto);
        UserLoginDto Verify(UserUpdateDto userUpdateDto);
        UserUpdateDto GetUser(Guid id);
        List<UserUpdateDto> GetUnverifiedMerchants();
        Task<bool> UploadImage(IFormFile image, string userImage);
        byte[] GetImage(Guid id);
    }
}
