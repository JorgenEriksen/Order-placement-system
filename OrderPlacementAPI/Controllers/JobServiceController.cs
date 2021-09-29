using Microsoft.AspNetCore.Mvc;
using OrderPlacementAPI.Models;
using OrderPlacementAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderPlacementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobServiceController : Controller
    {

        public JobServiceService _jobServiceService;

        public JobServiceController(JobServiceService jobServiceService)
        {
            _jobServiceService = jobServiceService;
        }

        [HttpGet]
        public IActionResult GetAllJobServices()
        {
            var _allJobServices = _jobServiceService.GetAllJobServices();
            if (_allJobServices != null)
            {
                return Ok(_allJobServices);
            };
            return NotFound();
        }
    }
}
