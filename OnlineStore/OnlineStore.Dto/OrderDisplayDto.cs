using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Dto
{
    public class OrderDisplayDto
    {
        public string Address { get; set; }
        public string Comment { get; set; }
        public long UserId { get; set; }
        public List<ProductUpdateDto> Products { get; set; }
        public double FinalPrice { get; set; }
        public DateTime OrderTime { get; set; }
        public DateTime DeliveryTime { get; set; }
        public Guid Id { get; set; }
    }
}
