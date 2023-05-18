using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineStore.Models.Enums;
using OnlineStore.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Database.Infrastructure.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.HasMany(x => x.Products)
                   .WithOne(x => x.Order)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Customer)
                   .WithMany(x => x.Orders)
                   .OnDelete(DeleteBehavior.NoAction);

            builder.Property(x => x.Status)
                   .HasConversion(
                        x => x.ToString(),
                        x => Enum.Parse<OrderState>(x)
                    );
        }
    }
}
