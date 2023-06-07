using AutoMapper;
using OnlineStore.Dto;
using OnlineStore.Models.Models;
using OnlineStore.Repository.Interfaces;
using OnlineStore.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Services
{
    public class ProductService : IProductService
    {

        private readonly IProductRepository _productRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public ProductService(IMapper mapper, IProductRepository productRepository, IUserRepository userRepository)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public ProductUpdateDto AddNew(ProductDto productDto)
        {
            Product product = _mapper.Map<Product>(productDto);
            _productRepository.AddNew(product);
            ProductUpdateDto productUpdateDto = _mapper.Map<ProductUpdateDto>(product);
            return productUpdateDto;
        }

        public ProductUpdateDto GetProductById(Guid Id)
        {
            Product product = _productRepository.GetProductById(Id);
            ProductUpdateDto productUpdateDto = _mapper.Map<ProductUpdateDto>(product);
            return productUpdateDto;
        }
    }
}
