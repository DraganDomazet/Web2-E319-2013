using Microsoft.AspNetCore.Mvc;
using OnlineStore.Dto;
using OnlineStore.Services.Interfaces;

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
    }
}
