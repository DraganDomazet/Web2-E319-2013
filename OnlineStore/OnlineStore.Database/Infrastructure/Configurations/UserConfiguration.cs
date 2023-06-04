using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using OnlineStore.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OnlineStore.Models.Enums;

namespace OnlineStore.Database.Infrastructure.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.HasIndex(x => x.Username).IsUnique();

            builder.HasMany(x => x.Products)
                   .WithOne(x => x.Merchant)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.Orders)
                   .WithOne(x => x.Customer)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.Property(x => x.UserType)
                   .HasConversion(
                        x => x.ToString(),
                        x => Enum.Parse<UserType>(x)
                    );

        }
    }
}
