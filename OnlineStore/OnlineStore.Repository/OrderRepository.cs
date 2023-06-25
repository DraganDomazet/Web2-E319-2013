using OnlineStore.Database;
using OnlineStore.Models.Enums;
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

        public List<Order> GetAll()
        {
            List<Order> orders = new List<Order>();
            foreach (Order order in _dbContext.Orders)
            {
                orders.Add(order);
            }
            return orders;
        }

        public Order Find(Guid id)
        {
            Order order = _dbContext.Orders.Find(id);
            return order;
        }

        public Order CancelOrder(Order order)
        {
            order.Status = OrderState.Canceled;
            _dbContext.Orders.Update(order);
            _dbContext.SaveChanges();
            return order;
        }
    }
}
