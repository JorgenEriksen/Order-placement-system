using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderPlacementAPI.Models
{
    public class OrderJobService
    {
        public long Id { get; set; }
        public Order Order { get; set; }
        public long OrderId { get; set; }
        public JobService JobService { get; set; }
        public long JobServiceId { get; set; }
    }
}
