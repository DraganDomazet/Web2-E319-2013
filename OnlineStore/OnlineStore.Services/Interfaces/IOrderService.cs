using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using OnlineStore.Dto;
using System.Threading.Tasks;

namespace OnlineStore.Services.Interfaces
{
    public interface IOrderService
    {
        OrderReturnDto AddNew(OrderListDto orderDto);
        List<OrderDto> GetAllOrders();
        List<OrderDto> GetUserOrders(Guid id);
        List<OrderDto> GetOrders(Guid id); //order with product of current merchant
        bool CancelOrder(Guid id);
    }
}
