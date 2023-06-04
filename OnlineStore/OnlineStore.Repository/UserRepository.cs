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
    public class UserRepository : IUserRepository
    {
        private DataContext _dbContext;
        public UserRepository(DataContext orderDbContext)
        {
            _dbContext = orderDbContext;
        }

        public User Add(User newUser)
        {
            _dbContext.Users.Add(newUser);
            _dbContext.SaveChanges();
            return newUser;
        }

        public User FindUser(string userName)
        {
            return _dbContext.Users.FirstOrDefault(u => String.Equals(u.Username, userName));
        }

        public User FindByEmail(string email)
        {
            return _dbContext.Users.SingleOrDefault<User>(u => String.Equals(u.Email, email));
        }

        public User UpdateUser(User user)
        {
            _dbContext.Users.Update(user);
            _dbContext.SaveChanges();
            return user;
        }

    }
}
