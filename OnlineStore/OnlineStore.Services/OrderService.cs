using AutoMapper;
using OnlineStore.Dto;
using OnlineStore.Models.Enums;
using OnlineStore.Models.Models;
using OnlineStore.Repository.Interfaces;
using OnlineStore.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace OnlineStore.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IUserRepository _userRepository;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;


        public OrderService(IOrderRepository orderRepository, IMapper mapper, IUserRepository userRepository, IProductRepository productRepository)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
            _userRepository = userRepository;
            _productRepository = productRepository;
        }


        public OrderReturnDto AddNew(OrderListDto orderDto)
        {
            OrderReturnDto orderBack = new OrderReturnDto();
            List<Order> orders = new List<Order>();
            List<Product> products = new List<Product>();
            orderBack.FinalyPrice = 0;
            int dostava = 0;
            List<int> UsersIds = new List<int>();
            foreach (OrderLineItemDto a in orderDto.Products)
            {
                Product product = _productRepository.GetProductById(a.Id);

                if (a != null)
                {
                    if (product.Amount >= a.Amount)
                    {
                        product.Amount -= a.Amount;
                        orderBack.FinalyPrice += a.Amount * a.IndividualPrice;
                        Order order = new Order {CustomerId= orderDto.UserId, DeliveryAddress = orderDto.Address, Price = a.IndividualPrice, Comment = orderDto.Comment, Status = OrderState.Started };
                        orders.Add(order);

                        products.Add(product);
                    }
                    else
                    {
                        return null;
                    }
                }
                else
                {
                    return null;
                }

            }
            orderBack.FinalyPrice += dostava;
            orderBack.DeliveryTime = DateTime.Now.AddDays(1);

            DateTime now = DateTime.Now;

            try
            {
                foreach (Order o in orders)
                {
                    o.Price = orderBack.FinalyPrice;
                    o.TimeOfDelivery = orderBack.DeliveryTime;
                    o.CancellationWindow = now;
                    var or = _orderRepository.AddNew(o);
                    var s = or;
                }
                //foreach (Product product in articles)
                //{
                //    _articleRepository.Edit(article1);
                //}
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return orderBack;

        }


    }
}
