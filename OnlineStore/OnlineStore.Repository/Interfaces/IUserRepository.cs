﻿using OnlineStore.Models.Models;
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
        //User Find(User user);
        //User FindEmail(User user);
        //User Edit(User user);
        //User Verificate(User user);
        //User FindById(long Id);
        //List<User> GetAll();
        //void Remove(User entity);

    }
}
