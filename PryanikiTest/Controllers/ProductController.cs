using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PryanikiTest.Models;
using PryanikiTest.Services;

namespace PryanikiTest.Controllers
{
    [Route("api/product")]
    [Produces("application/json")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductController(ProductService productService)
        {
            _productService = productService;
        }
        
        /// <summary>
        /// List of all Products
        /// </summary>
        /// <returns>List of all Products</returns>
        [HttpGet]
        public ActionResult<List<Product>> Get() =>
            _productService.Get();
        
        /// <summary>
        /// Get one product
        /// </summary>
        /// <param name="id">Id</param>
        /// <returns>One product</returns>
        [HttpGet("{id}")]
        public ActionResult<Product> Get(string id)
        {
            var product = _productService.Get(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }
        
        /// <summary>
        /// Update one product
        /// </summary>
        /// <param name="id">Id</param>
        /// <param name="productIn">New product in body json</param>
        /// <returns>Updated product</returns>
        [HttpPut("{id}")]
        public ActionResult Update(string id,[FromBody] Product productIn)
        {
            var product = _productService.Get(id);

            if (product == null)
            {
                return new JsonResult(NotFound());
            }
            
            _productService.Update(id, productIn);

            product = _productService.Get(id);
            
            return new JsonResult(product);
        }

        // POST: api/Product
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /// <summary>
        /// Create new product
        /// </summary>
        /// <param name="product">Product in body json</param>
        /// <returns>New product</returns>
        [HttpPost]
        public ActionResult Create([FromBody] Product product)
        {
            _productService.Create(product);
            
            return new JsonResult(product);
        }

        // DELETE: api/Product/5
        /// <summary>
        /// Delete one product
        /// </summary>
        /// <param name="id">Id</param>
        /// <returns>NoContent</returns>
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var product = _productService.Get(id);

            if (product == null)
            {
                return NotFound();
            }
            
            _productService.Remove(product.Id);

            return new StatusCodeResult(200); 
            // Вместо NoContext() используется кодрезалт200, потому что ноконтекст вернёт статускод204, а
            // библиотеки и другие программы плохо работают с кодами, отличными от 200/500/400,
            // поэтому чаще всего используется лишь стандартный набор кодов, поэтому вернём code OK 
        }

        // private bool ProductExists(long id)
        // {
        //     return _context.Products.Any(e => e.Id == id);
        // }
    }
}
