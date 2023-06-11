using OnlineStore.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Dto
{
    public class OrderListDto
    {
        public string Address { get; set; }
        public string Comment { get; set; }        
        public Guid UserId { get; set; }        
        public List<OrderLineItemDto> Products { get; set; }
    }
}
