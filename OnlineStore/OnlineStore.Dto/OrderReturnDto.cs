using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Dto
{
    public class OrderReturnDto
    {
        public Guid Id { get; set; }
        public double FinalyPrice { get; set; }
        public DateTime DeliveryTime { get; set; }
        public bool IsDeliverd { get; set; }
    }
}
