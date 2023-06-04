using Microsoft.Extensions.Configuration;
using OnlineStore.Dto;
using OnlineStore.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using FacebookCore;
using Newtonsoft.Json.Linq;

namespace OnlineStore.Services
{
    public class AuthService : IAuthService
    {

        private readonly IConfiguration _facebookSettings;

        public AuthService(IConfiguration config)
        {
            _facebookSettings = config.GetSection("FacebookAuthSettings");
        }


        public async Task<FacebookInfoDto> VerifyFacebookTokenAsync(FacebookTokenDto tokenDto)
        {
            string[] userInfo = { "id", "name", "email", "first_name", "last_name" };
            if (string.IsNullOrEmpty(tokenDto.Token))
            {
                return null;
            }
            FacebookClient client = new FacebookClient(_facebookSettings.GetSection("clientId").Value,
                                                       _facebookSettings.GetSection("clientSecret").Value);
            try
            {
                var api = client.GetUserApi(tokenDto.Token);
                JObject info = await api.RequestInformationAsync(userInfo);
                if (info == null)
                    return null;
                FacebookInfoDto faceBookInfo = new FacebookInfoDto()
                {
                    ID = (string)info["id"],
                    Name = (string)info["first_name"],
                    LastName = (string)info["last_name"],
                    Email = (string)info["email"],

                };
                return faceBookInfo;
            }
            catch
            {
                return null;
            }
        }
    }
}
