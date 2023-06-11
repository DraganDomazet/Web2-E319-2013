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
    public class ProductRepository : IProductRepository
    {
        private DataContext _dbContext;
        public ProductRepository(DataContext orderDbContext)
        {
            _dbContext = orderDbContext;
        }

        public Product AddNew(Product product)
        {
            _dbContext.Products.Add(product);
            _dbContext.SaveChanges();
            return product;
        }

        public Product UpdateProduct(Product product)
        {
            _dbContext.Products.Update(product);
            _dbContext.SaveChanges();
            return product;
        }

        public Product GetProductById(Guid id)
        {
            return _dbContext.Products.SingleOrDefault<Product>(u => u.Id == id);
        }

        public List<Product> GetAll()
        {
            return _dbContext.Products.ToList();
        }
    }
}
