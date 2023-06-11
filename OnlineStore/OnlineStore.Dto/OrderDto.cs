using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Dto
{
    public class OrderDto
    {
        public Guid Id { get; set; }
        public List<OrderDto> Products { get; set; }
        public string Comment { get; set; }
        public string DeliveryAddress { get; set; }
        public double Price { get; set; }
        public string Status { get; set; }
        public DateTime CancellationWindow { get; set; }    // 1 Hour from creation
        public DateTime TimeOfDelivery { get; set; }
        public Guid UserId { get; set; }
    }
}
