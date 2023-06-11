﻿using OnlineStore.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Repository.Interfaces
{
    public interface IOrderRepository
    {
        Order AddNew(Order order);
        List<Order> GetAll();
    }
}
