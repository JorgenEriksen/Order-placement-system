using Microsoft.AspNetCore.Mvc;
using OrderPlacementAPI.Services;
using OrderPlacementAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderPlacementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : Controller
    {
        public OrderService _orderService;

        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("{id}")]
        public IActionResult GetOrderById(int id)
        {
            return Ok();
        }

        [HttpPost]
        public IActionResult AddOrder(OrderDetailsVM addOrderVM)
        {
            System.Diagnostics.Debug.WriteLine("test0");
            _orderService.AddOrder(addOrderVM);
            return Ok();
        }


    }
}
