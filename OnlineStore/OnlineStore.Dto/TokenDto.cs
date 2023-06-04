using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Dto
{
    public class TokenDto
    {
        public string Token { get; set; }
        public UserUpdateDto User { get; set; }
    }
}
