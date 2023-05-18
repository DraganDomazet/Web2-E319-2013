using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Models.Models
{
    public class OrderLineItem
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public int Amount { get; set; }
        public double Price { get; set; }
        public Guid OrderId { get; set; }
        public Order Order { get; set; }
    }
}
