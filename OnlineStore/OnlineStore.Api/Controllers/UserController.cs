using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineStore.Dto;
using OnlineStore.Services.Interfaces;
using System.Data;

namespace OnlineStore.Api.Controllers
{
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        IWebHostEnvironment webHostEnvironment;

        public UserController(IUserService userService, IWebHostEnvironment webHostEnvironment)
        {
            _userService = userService;
            this.webHostEnvironment = webHostEnvironment;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] UserDto userDto)
        {
            return Ok(_userService.AddUser(userDto));
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
    }
}
