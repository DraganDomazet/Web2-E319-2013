using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineStore.Dto;
using OnlineStore.Services.Interfaces;
using System.Data;

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

        [HttpPost("upload-image/{id}")]
        public async Task<IActionResult> UploadImage(IFormFile image, Guid id)
        {
            try
            {
                await _userService.UploadImage(image, id);
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

        [HttpGet("get-image/{id}")]
        public IActionResult GetImage(Guid id)
        {

            var imagesbytes = _userService.GetImage(id);
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
        [Authorize(Roles = "user")]
        public IActionResult Edit([FromBody] UserUpdateDto userDto)
        {
            return Ok(_userService.UpdateUser(userDto));
        }

        [HttpPost("login")]
        public IActionResult LogIn([FromBody] UserLoginDto userDto)
        {
            return Ok(_userService.Login(userDto));
        }

        [HttpPost("facebook-login")]
        public async Task<IActionResult> FacebookLogin([FromBody] FacebookTokenDto fbTokenDto)
        {
            return Ok(_userService.FacebookLogin(fbTokenDto).Result);
        }

        [HttpPut("verify")]
        [Authorize(Roles = "Admin")]
        public IActionResult Verify([FromBody] UserUpdateDto userUpdateDto)
        {
            return Ok(_userService.Verify(userUpdateDto));
        }


        /// <summary>
        /// Test
        /// </summary>
        /// <returns></returns>
        [HttpGet("check-verification")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetRequested()
        {
            return Ok(_userService.GetUnverifiedMerchants());
        }

    }
}
