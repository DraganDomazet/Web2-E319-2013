using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineStore.Dto;
using OnlineStore.Services.Interfaces;
using System.Data;
using System.Security.Claims;

namespace OnlineStore.Api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] UserDto userDto)
        {
            return Ok(_userService.AddUser(userDto));
        }

        [HttpPost("upload-image/{userImage}")]
        public async Task<IActionResult> UploadImage(IFormFile image, string userImage)
        {
            try
            {
                await _userService.UploadImage(image, userImage);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("get-user/{id}")]
        [Authorize(Roles = "user")]
        public IActionResult GetUser(Guid id)
        {
            // long id = Int64.Parse(ids);
            return Ok(_userService.GetUser(id));
        }

        [HttpGet("get-image/{imageName}")]
        public IActionResult GetImage(string imageName)
        {

            var imagesbytes = _userService.GetImage(imageName);
            if (imagesbytes.Length == 1)
            {
                return NotFound();
            }
            else
            {
                return File(imagesbytes, "image/jpeg");
            }
        }

        [HttpPut("update")]
        //[Authorize(Roles = "user")]
        public IActionResult Edit([FromBody] UserUpdateDto userDto)
        {
            return Ok(_userService.UpdateUser(userDto));
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLoginDto userDto)
        {
            return Ok(_userService.Login(userDto));
        }

        [HttpPost("facebook-login")]
        public async Task<IActionResult> FacebookLogin([FromBody] FacebookTokenDto fbTokenDto)
        {
            return Ok(_userService.FacebookLogin(fbTokenDto).Result);
        }

        [HttpPut("verify")]
        [Authorize(Roles = "admin")]
        public IActionResult Verify([FromBody] UserUpdateDto userUpdateDto)
        {
            return Ok(_userService.Verify(userUpdateDto));
        }

        [HttpPost("decline")]
        [Authorize(Roles = "admin")]
        public IActionResult DeclineVerification([FromBody] UserUpdateDto userUpdateDto)
        {
            _userService.DeclineVerification(userUpdateDto);
            return Ok();
        }



        [HttpGet("get-merchants")]
        [Authorize(Roles = "admin")]
        public IActionResult GetRequested()
        {
            return Ok(_userService.GetUnverifiedMerchants());
        }

    }
}
