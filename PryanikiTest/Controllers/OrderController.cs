using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PryanikiTest.Models;
using PryanikiTest.Services;

namespace PryanikiTest.Controllers
{
    [Route("api/order")]
    [Produces("application/json")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }
        
        /// <summary>
        /// List of all orders
        /// </summary>
        /// <returns>List of all orders</returns>
        [HttpGet]
        public ActionResult<List<Order>> Get() =>
            _orderService.Get();
        
        /// <summary>
        /// Get one order
        /// </summary>
        /// <param name="id">Id</param>
        /// <returns>One order</returns>
        [HttpGet("{id}")]
        public ActionResult<Order> Get(string id)
        {
            var order = _orderService.Get(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }
        
        /// <summary>
        /// Update one order
        /// </summary>
        /// <param name="id">Id</param>
        /// <param name="orderIn">New order in body json</param>
        /// <returns>Status 200</returns>
        [HttpPut("{id}")]
        public ActionResult Update(string id,[FromBody] Order orderIn)
        {
            var order = _orderService.Get(id);

            if (order == null)
            {
                return new JsonResult(NotFound());
            }
            
            _orderService.Update(id, orderIn);
            
            return new OkResult();
        }
        
        /// <summary>
        /// Create new order
        /// </summary>
        /// <param name="order">Order in body json</param>
        /// <returns>New order</returns>
        [HttpPost]
        public ActionResult Create([FromBody] Order order)
        {
            _orderService.Create(order);
            
            return new JsonResult(order);
        }

        /// <summary>
        /// Delete one order
        /// </summary>
        /// <param name="id">Id</param>
        /// <returns>NoContent</returns>
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var order = _orderService.Get(id);

            if (order == null)
            {
                return NotFound();
            }
            
            _orderService.Remove(order.Id);

            return new OkResult(); 
            // Вместо NoContext() используется кодрезалт200, потому что ноконтекст вернёт статускод204, а
            // библиотеки и другие программы плохо работают с кодами, отличными от 200/500/400,
            // поэтому чаще всего используется лишь стандартный набор кодов, поэтому вернём code OK 
        }
    }
}
