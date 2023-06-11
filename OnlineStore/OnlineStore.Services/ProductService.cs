using AutoMapper;
using Microsoft.AspNetCore.Http;
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

        public async Task<bool> UploadImage(IFormFile imageFile, string userImage)
        {
            try
            {
                var filePath = Path.Combine("Products", userImage + Path.GetExtension(imageFile.FileName));
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

        public List<ProductUpdateDto> GetAll()
        {
            List<ProductUpdateDto> articleDtos = new List<ProductUpdateDto>();
            foreach (Product a in _productRepository.GetAll())
            {
                if (a.Amount != 0)
                {
                    articleDtos.Add(_mapper.Map<ProductUpdateDto>(a));
                }
            }
            return articleDtos;
        }

        public byte[] GetImage(string imageName)
        {
            try
            {
                var path = Path.Combine("Products", imageName + ".png");
                var imageBytes = File.ReadAllBytes(path);
                return imageBytes;
            }
            catch
            {
                return Array.Empty<byte>();
            }
        }
    }
}
