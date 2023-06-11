using OnlineStore.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Repository.Interfaces
{
    public interface IProductRepository
    {
        Product AddNew(Product product);
        Product UpdateProduct(Product product);
        Product GetProductById(Guid id);
        List<Product> GetAll();


    }
}
