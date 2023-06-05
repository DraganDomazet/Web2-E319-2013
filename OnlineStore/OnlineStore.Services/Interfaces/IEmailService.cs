using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Services.Interfaces
{
    public interface IEmailService
    {
        void SendEmail(string to, string subject, string text);
    }
}
