using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MimeKit;
using OnlineStore.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;
using MailKit.Net.Smtp;


namespace OnlineStore.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void SendEmail(string email, string subject, string body)
        {
            MimeMessage mailMessage = new MimeMessage();
            mailMessage.From.Add(new MailboxAddress("OnlineStore.Api", _configuration["Smtp:Username"]));
            mailMessage.To.Add(new MailboxAddress("You", email));
            mailMessage.Subject = subject;
            mailMessage.Body = new TextPart("plain")
            {
                Text = body
            };

            using (var smtpClient = new SmtpClient())
            {
                smtpClient.Connect(_configuration["Smtp:Host"], int.Parse(_configuration["Smtp:Port"]), true);
                smtpClient.Authenticate(_configuration["Smtp:Username"], _configuration["Smtp:Password"]);
                smtpClient.Send(mailMessage);
                smtpClient.Disconnect(true);
            }
            //var smtpClient = new SmtpClient(_configuration["Smtp:Host"], int.Parse(_configuration["Smtp:Port"]))
            //{
            //    EnableSsl = true,
            //    Credentials = new NetworkCredential(_configuration["Smtp:Username"], _configuration["Smtp:Password"])
            //};

            //smtpClient.SendMailAsync(new MailMessage(from: _configuration["Smtp:Username"],
            //                                                to: email,
            //                                                subject: subject,
            //                                                body: body));
        }
    }
}
