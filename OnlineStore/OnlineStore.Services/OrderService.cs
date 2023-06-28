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
            Order order = new Order();
            List<Product> products = new List<Product>();
            orderBack.FinalyPrice = 0;
            int dostava = 0;

            foreach (OrderLineItemDto a in orderDto.Products)
            {
                Product product = _productRepository.GetProductById(a.Id);

                if (a != null)
                {
                    if (product.Amount >= a.Amount)
                    {
                        product.Amount -= a.Amount;
                        orderBack.FinalyPrice += a.Amount * a.IndividualPrice;
                        order = new Order { CustomerId = orderDto.UserId, DeliveryAddress = orderDto.Address, Price = a.IndividualPrice, Comment = orderDto.Comment, Status = OrderState.Started };
                        order.Price = orderBack.FinalyPrice;
                        


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

            try
            {
                foreach (Product product in products)
                {
                    if (order.ProductIds != null)
                    {
                        order.ProductIds = order.ProductIds + '/' + product.Id.ToString();
                    } else
                    {
                        order.ProductIds = product.Id.ToString();
                    }
                    _productRepository.UpdateProduct(product);
                }
                var or = _orderRepository.AddNew(order);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return orderBack;

        }

        public double GetFinalPrice(OrderListDto orderDto)
        {
            OrderReturnDto orderBack = new OrderReturnDto();
            Order order = new Order();
            List<Product> products = new List<Product>();
            orderBack.FinalyPrice = 0;
            double dostava = 4.99;

            foreach (OrderLineItemDto a in orderDto.Products)
            {
                Product product = _productRepository.GetProductById(a.Id);

                if (a != null)
                {
                    if (product.Amount >= a.Amount)
                    {
                        product.Amount -= a.Amount;
                        orderBack.FinalyPrice += a.Amount * a.IndividualPrice;
                        order = new Order { CustomerId = orderDto.UserId, DeliveryAddress = orderDto.Address, Price = a.IndividualPrice, Comment = orderDto.Comment, Status = OrderState.Started };
                        order.Price = orderBack.FinalyPrice;



                        products.Add(product);
                    }
                }

            }
            orderBack.FinalyPrice += dostava;
            return orderBack.FinalyPrice;

        }

            public List<OrderDto> GetAllOrders()
        {
            List<OrderDto> orderDtos = new List<OrderDto>();

            List<Order> orders = _orderRepository.GetAll();

            foreach (var o in orders)
            {
                OrderDto orderDto = _mapper.Map<OrderDto>(o);
                orderDto.UserId = o.CustomerId;
                orderDtos.Add(orderDto);
            }

            return orderDtos;
        }


        public List<OrderDto> GetUserOrders(Guid id)
        {
            User user = _userRepository.FindById(id);
            List<OrderDto> orderDtos = new List<OrderDto>();

            List<Order> orders = _orderRepository.GetAll();
            foreach (var o in orders)
            {
                if (o.Status == OrderState.Started && o.CustomerId == id)
                {
                    OrderDto orderDto = _mapper.Map<OrderDto>(o);
                    orderDto.UserId = o.CustomerId;
                    orderDtos.Add(orderDto);
                }
            }

            return orderDtos;

        }

        public bool CancelOrder(Guid id)
        {
            Order order = _orderRepository.Find(id);
            if (order.CancellationWindow >= DateTime.Now)
            {
                _orderRepository.CancelOrder(order);

                return true;
            }
            return false;
        }


        public List<OrderDto> GetOrders(Guid id)
        {
            User user = _userRepository.FindById(id);
            List<OrderDto> orderDtos = new List<OrderDto>();

            List<Order> orders = _orderRepository.GetAll();
            List<Product> products = _productRepository.GetAll();
            var filteredProduct = products.Where(p => p.MerchantId == id);
            var productsIds = filteredProduct.Select(x => x.Id.ToString()).ToList();


            foreach (var o in orders)
            {
                if (o.ProductIds != null && o.Status != OrderState.Canceled)
                {   
                    var a = o.ProductIds.Split('/').ToList();
                    if (a.Any(p => productsIds.Contains(p)))
                    {
                        OrderDto orderDto = _mapper.Map<OrderDto>(o);
                        orderDto.UserId = o.CustomerId;
                        orderDtos.Add(orderDto);

                    }
                }
            }

            return orderDtos;

        }

        public bool AcceptOrder(Guid id)
        {
            Order order = _orderRepository.Find(id);
            if (order != null)
            {
                order.isAccepted = true;
                order.TimeOfDelivery = DateTime.Now.AddDays(1);
                order.CancellationWindow = DateTime.Now.AddHours(1);
                _orderRepository.AcceptOrder(order);
                return true;
            }
            return false;
        }


    }
}
