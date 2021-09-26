using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderPlacementAPI.Models
{
    public class DbInitializer
    {
        public static void Seed(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<OrderPlacementContext>();
                if (!context.JobService.Any())
                {
                    context.JobService.AddRange(new JobService()
                    {
                        ServiceName = "Moving",
                    },
                    new JobService()
                    {
                        ServiceName = "Packing",
                    },
                    new JobService()
                    {
                        ServiceName = "Cleaning",
                    });
                    context.SaveChanges();
                }
            }
        }
    }
}
