﻿using OnlineStore.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Services.Interfaces
{
    public interface IAuthService
    {
        Task<FacebookInfoDto> VerifyFacebookTokenAsync(FacebookTokenDto tokenDto);
    }
}