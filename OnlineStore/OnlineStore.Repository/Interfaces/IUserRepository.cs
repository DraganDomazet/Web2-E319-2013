using Microsoft.AspNetCore.Http;
using OnlineStore.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Repository.Interfaces
{
    public interface IUserRepository
    {
        User Add(User newUser);
        User FindUser(string userName);
        User UpdateUser(User user);
        User FindByEmail(string email);
        User SaveVerificationStatus(User user);
        List<User> GetAllUsers();
        Task<string> SaveImage(IFormFile imageFile, string name, string path);
    }
}
