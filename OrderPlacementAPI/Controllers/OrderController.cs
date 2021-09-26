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

        [HttpGet]
        public IActionResult GetAllOrderDetails()
        {
            var _allOrderDetails = _orderService.GetOrderDetails();
            return Ok(_allOrderDetails);
        }

        [HttpGet("{id}")]
        public IActionResult GetOrderDetailById(long id)
        {
            var _orderDetail = _orderService.GetOrderDetailById(id);
            if (_orderDetail != null)
            {
                return Ok(_orderDetail);
            }
            return NotFound();

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
