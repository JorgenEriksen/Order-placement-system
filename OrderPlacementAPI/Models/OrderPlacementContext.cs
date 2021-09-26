using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderPlacementAPI.Models
{
    public class OrderPlacementContext : DbContext
    {
        public OrderPlacementContext(DbContextOptions<OrderPlacementContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /*
            modelBuilder.Entity<Order>()
                .HasOne(x => x.ToAddress)
                .WithMany()
                .HasForeignKey(x => x.ToAddressId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Order>()
                .HasOne(x => x.FromAddress)
                .WithMany()
                .HasForeignKey(x => x.FromAddressId)
                .OnDelete(DeleteBehavior.SetNull);
            */
        }

        public DbSet<Customer> Customer { get; set; }
        public DbSet<Address> Address { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<JobService> JobService { get; set; }
        public DbSet<OrderJobService> OrderJobService { get; set; }

    }
}
