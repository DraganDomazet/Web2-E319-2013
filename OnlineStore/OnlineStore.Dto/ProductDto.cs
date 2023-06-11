using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Dto
{
    public class ProductDto
    {
        
        public string Name { get; set; }

        
        public double Price { get; set; }

        
        public int Amount { get; set; }

        
        public string Description { get; set; }

        public string ProductImageUrl { get; set; }

        
        public Guid MerchantId { get; set; }
    }
}
