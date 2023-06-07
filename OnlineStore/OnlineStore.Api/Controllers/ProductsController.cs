using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineStore.Dto;
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
        [Authorize(Roles = "Merchant")]
        public IActionResult AddProduct([FromBody] ProductDto productDto)
        {
            return Ok(_productService.AddNew(productDto));
        }
    }
}
