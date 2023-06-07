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
        [Required]
        public string Name { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public int Amount { get; set; }

        [Required]
        public string Description { get; set; }

        public string ProductImageUrl { get; set; }

        [Required]
        public Guid MerchantId { get; set; }
    }
}
