﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Dto
{
    public class OrderLineItemDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Amount { get; set; }
        public int IndividualPrice { get; set; }
        public string Description { get; set; }
        public string ProductImageUrl { get; set; }
        public Guid MerchantId { get; set; }
    }
}