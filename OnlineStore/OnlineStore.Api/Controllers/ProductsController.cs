using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineStore.Dto;
using OnlineStore.Services;
using OnlineStore.Services.Interfaces;
using System.Data;

namespace OnlineStore.Api.Controllers
{

    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {

        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost("add")]
        [Authorize(Roles = "merchant")]
        public IActionResult AddProduct([FromBody] ProductDto productDto)
        {
            return Ok(_productService.AddNew(productDto));
        }

        [HttpGet("get-product/{id}")]
        [Authorize(Roles = "user")]
        public IActionResult GetProductById(Guid id)
        {
            return Ok(_productService.GetProductById(id));
        }

        [HttpPost("upload-image/{userImage}")]
        [Authorize(Roles = "merchant")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile image, string userImage)
        {
            try
            {
                await _productService.UploadImage(image, userImage);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("get-all")]
        [Authorize(Roles = "user")]
        public IActionResult GetAll()
        {
            return Ok(_productService.GetAll());
        }

        [HttpGet("get-image/{imageName}")]
        public IActionResult GetImage(string imageName)
        {

            var imagesbytes = _productService.GetImage(imageName);
            if (imagesbytes.Length == 1)
            {
                return NotFound();
            }
            else
            {
                return File(imagesbytes, "image/jpeg");
            }
        }


    }
}
