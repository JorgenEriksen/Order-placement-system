using OrderPlacementAPI.Models;
using OrderPlacementAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderPlacementAPI.Services
{
    public class OrderService
    {

        private OrderPlacementContext _context;
        public OrderService(OrderPlacementContext context)
        {
            _context = context;
        }

        public OrderDetailsVM GetOrderDetails()
        {
            var _orderDetails = new OrderDetailsVM();
            return _orderDetails;
        }

        public OrderDetailsVM GetOrderDetailById()
        {
            var _orderDetails = new OrderDetailsVM();
            return _orderDetails;
        }

        public void AddOrder(OrderDetailsVM newOrder)
        {
            // Customer table
            var _newCustomer = new Customer()
            {
                Firstname = newOrder.Firstname,
                Lastname = newOrder.Lastname,
                Phone = newOrder.Phone,
                Email = newOrder.Email,
            };
            _context.Customer.Add(_newCustomer);

            // Address table
            var _newFromAddress = new Address()
            {
                Street = newOrder.FromStreet,
                ZipCode = newOrder.FromZipCode,
                City = newOrder.FromCity,
            };
            var _newToAddress = new Address()
            {
                Street = newOrder.ToStreet,
                ZipCode = newOrder.ToZipCode,
                City = newOrder.ToCity,
            };
            _context.Address.Add(_newFromAddress);
            _context.Address.Add(_newToAddress);


            // Order table
            var _newOrder = new Order()
            {
                Customer = _newCustomer,
                FromAddress = _newFromAddress,
                ToAddress = _newToAddress,
                ServiceDate = newOrder.ServiceDate,
                OrderNote = newOrder.ServiceDate,
            };
            _context.Order.Add(_newOrder);

            // OrderToService table
            foreach (long jobServiceId in newOrder.JobServices)
            {
                var _jobService = _context.JobService.FirstOrDefault(s => s.Id == jobServiceId);
                if(_jobService != null)
                {
                    var _newOrderToService = new OrderJobService()
                    {
                        Order = _newOrder,
                        JobService = _jobService,
                    };
                    _context.OrderJobService.Add(_newOrderToService);
                }
            }
            _context.SaveChanges();

        }
    }
}
