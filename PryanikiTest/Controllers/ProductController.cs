using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PryanikiTest.Models;

namespace PryanikiTest.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductContext _context;

        public ProductController(ProductContext context)
        {
            _context = context;
        }

        // GET: api/Product
        /// <summary>
        /// List of all Products
        /// </summary>
        /// <returns>List of all Products</returns>
        [HttpGet]
        public async Task<JsonResult> GetProducts()
        { // Task<ActionResult<IEnumerable<Product>>>
            JsonResult result;
            try
            {
                result = new JsonResult(await _context.Products.ToListAsync());
            }
            catch (Exception ex)
            {
                result = new JsonResult(StatusCode(500, ex));
            }

            return result;
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<JsonResult> GetProduct(long id)
        { // Task<ActionResult<Product>>
            // var result = await services.GetProduct(); 
            // var product = await _context.Products.FindAsync(id);
            //
            // if (product == null)
            // {
            //     return NotFound();
            // }

            // return new JsonResult(result);
            throw new NotImplementedException();
        }

        // PUT: api/Product/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(long id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Product
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            // return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(long id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(long id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
