using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        // GET: api/Product
        /// <summary>
        /// List of all Products
        /// </summary>
        /// <returns>List of all Products</returns>
        [HttpGet]
        public ActionResult<List<Product>> Get() =>
            _productService.Get();

        // GET: api/Product/5
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

        // PUT: api/Product/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public IActionResult Update(string id,[FromBody] Product productIn)
        {
            var product = _productService.Get(id);

            if (product == null)
            {
                return NotFound();
            }
            
            _productService.Update(id, productIn);

            return NoContent();
        }

        // POST: api/Product
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public IActionResult Create([FromBody] Product product)
        {
            _productService.Create(product);

            return CreatedAtRoute("GetProduct", new {id = product.Id.ToString()}, product);
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var product = _productService.Get(id);

            if (product == null)
            {
                return NotFound();
            }
            
            _productService.Remove(product.Id);

            return NoContent();
        }

        // private bool ProductExists(long id)
        // {
        //     return _context.Products.Any(e => e.Id == id);
        // }
    }
}
