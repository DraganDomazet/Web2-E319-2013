using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineStore.Dto;
using OnlineStore.Services.Interfaces;
using System.Data;

namespace OnlineStore.Api.Controllers
{

    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("add-order")]
        [Authorize(Roles = "customer")]
        public IActionResult Add([FromBody] OrderListDto orderDto)
        {
            return Ok(_orderService.AddNew(orderDto));
        }

        [HttpGet("get-all-orders")]
        [Authorize(Roles = "admin")]
        public IActionResult GetAll()
        {
            return Ok(_orderService.GetAllOrders());
        }


    }
}
