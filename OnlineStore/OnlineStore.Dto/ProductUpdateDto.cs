using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Dto
{
    public class ProductUpdateDto
    {
        public Guid Id { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public string ProductImageUrl { get; set; }
        public Guid MerchantId { get; set; }
    }
}
