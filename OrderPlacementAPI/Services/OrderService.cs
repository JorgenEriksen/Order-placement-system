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

        public List<OrderDetailsVM> GetOrderDetails()
        {
            var _orders = _context.Order.ToList();
            var _orderDetails = new List<OrderDetailsVM>();
            foreach (Order order in _orders)
            {
                var _orderDetail = GetOrderDetailById(order.Id);
                _orderDetails.Add(_orderDetail);
            }
            return _orderDetails;
        }

        public OrderDetailsVM GetOrderDetailById(long orderId)
        {
            var _order = _context.Order.FirstOrDefault(o => o.Id == orderId);
            var _customer = _context.Customer.FirstOrDefault(c => c.Id == _order.CustomerId);
            var _orderJobService = _context.OrderJobService.Where(ojs => ojs.Id == orderId).ToList();
            var _fromAddress = _context.Address.FirstOrDefault(fa => fa.Id == _order.FromAddressId);
            var _toAddress = _context.Address.FirstOrDefault(fa => fa.Id == _order.ToAddressId);
            var JobServiceIds = new List<long>();

            foreach (OrderJobService orderJobService in _orderJobService)
            {
                JobServiceIds.Add(orderJobService.JobServiceId);
            }

            var _orderDetails = new OrderDetailsVM()
            {
                Firstname = _customer.Firstname,
                Lastname = _customer.Lastname,
                Phone = _customer.Phone,
                Email = _customer.Email,

                FromStreet = _fromAddress.Street,
                FromZipCode = _fromAddress.ZipCode,
                FromCity = _fromAddress.City,
                ToStreet = _toAddress.Street,
                ToZipCode = _toAddress.ZipCode,
                ToCity = _toAddress.City,
                JobServices = JobServiceIds,

                ServiceDate = _order.ServiceDate,
                OrderNote = _order.OrderNote,
            };

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
                OrderNote = newOrder.OrderNote,
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
