using OrderPlacementAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderPlacementAPI.Services
{
    public class JobServiceService
    {
        private OrderPlacementContext _context;
        public JobServiceService(OrderPlacementContext context)
        {
            _context = context;
        }

        public List<JobService> GetAllJobServices()
        {
            var _jobServices = _context.JobService.ToList();
            return _jobServices;
        }
    }
}
