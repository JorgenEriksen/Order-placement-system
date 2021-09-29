using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderPlacementAPI.ViewModels
{
    public class OrderDetailsVM
    {
        public long? Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string FromStreet { get; set; }
        public string FromZipCode { get; set; }
        public string FromCity { get; set; }
        public string ToStreet { get; set; }
        public string ToZipCode { get; set; }
        public string ToCity { get; set; }
        public List<long> JobServices { get; set; }
        public string ServiceDate { get; set; }
        public string OrderNote { get; set; }
    }
}
