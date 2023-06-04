using AutoMapper;
using OnlineStore.Dto;
using OnlineStore.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
            //CreateMap<Article, ArticleDto>().ReverseMap();
            //CreateMap<Article, ArticleEditDto>().ReverseMap();
            //CreateMap<Order, OrderDto>().ReverseMap();
        }
    }
}
