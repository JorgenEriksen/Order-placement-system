using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OrderPlacementAPI.Models
{
    public class Order
    {
        public long Id { get; set; }
        public Customer Customer { get; set; }
        public long CustomerId { get; set; }
        public long? FromAddressId { get; set; }
        public long? ToAddressId { get; set; }
        public string ServiceDate { get; set; }
        public string OrderNote { get; set; }

        public Address FromAddress { get; set; }
        public Address ToAddress { get; set; }
    }
}
