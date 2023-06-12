using Microsoft.AspNetCore.Http;
using OnlineStore.Dto;
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
        ProductUpdateDto UpdateProduct(ProductUpdateDto productUpdateDto);
        bool DeleteProduct(Guid Id);
        ProductUpdateDto GetProductById(Guid id);
        List<ProductUpdateDto> GetAll();
        List<ProductUpdateDto> MerchantProducts(Guid id);        
        Task<bool> UploadImage(IFormFile image, string userImage);
        byte[] GetImage(string imageName);
    }
}
