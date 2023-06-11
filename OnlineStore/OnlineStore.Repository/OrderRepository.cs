using OnlineStore.Database;
using OnlineStore.Models.Models;
using OnlineStore.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Repository
{
    public class OrderRepository : IOrderRepository
    {

        private readonly DataContext _dbContext;
        public OrderRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Order AddNew(Order order)
        {
            _dbContext.Orders.Add(order);
            _dbContext.SaveChanges();

            return order;
        }
    }
}
