﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using OnlineStore.Dto;
using System.Threading.Tasks;

namespace OnlineStore.Services.Interfaces
{
    public interface IOrderService
    {
        OrderReturnDto AddNew(OrderListDto orderDto);

    }
}