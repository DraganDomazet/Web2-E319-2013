﻿using OnlineStore.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Services.Interfaces
{
    public interface IProductService
    {
        ProductUpdateDto AddNew(ProductDto productDto);
        ProductUpdateDto GetProductById(Guid id);
    }
}
