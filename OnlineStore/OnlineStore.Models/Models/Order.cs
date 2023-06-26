using OnlineStore.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Models.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public List<OrderLineItem> Products { get; set; } = new List<OrderLineItem>();
        public string? ProductIds { get; set; } 
        public string Comment { get; set; }
        public string DeliveryAddress { get; set; }
        public double Price { get; set; }
        public OrderState Status { get; set; }
        public DateTime CancellationWindow { get; set; }
        public DateTime TimeOfDelivery { get; set; }
        public Guid CustomerId { get; set; }
        public User Customer { get; set; }
        public bool isAccepted { get; set; }
    }
}
