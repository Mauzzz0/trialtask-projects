using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
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
        public async Task<ActionResult<List<Product>>> Get()
        {
            var res = await _productService.GetAsync();
            
            return res.ToList();
        }

        /// <summary>
        /// Get one product
        /// </summary>
        /// <param name="id">Id</param>
        /// <returns>One product</returns>
        [HttpGet("{id}")]
        public async Task<Product> Get(string id)
        {
            var product = await _productService.GetAsync(id);

            if (product == null)
            {
                throw new Exception("error");
                // Не знаю как сделать правильнее, по-хорошему должен вернуться
                // json с statuscode 404 и/или message: 'Not Found'
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
        public async Task<ActionResult> Update(string id,[FromBody] Product productIn)
        {
            var product = await _productService.GetAsync(id);

            if (product == null)
            {
                return new JsonResult(NotFound());
            }
            
            await _productService.UpdateAsync(id, productIn);
            
            return new OkResult();
        }
        
        /// <summary>
        /// Create new product
        /// </summary>
        /// <param name="product">Product in body json</param>
        /// <returns>New product</returns>
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] Product product)
        {
            await _productService.CreateAsync(product);
            
            return new JsonResult(product);
        }
        
        /// <summary>
        /// Delete one product
        /// </summary>
        /// <param name="id">Id</param>
        /// <returns>NoContent</returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var product = await _productService.GetAsync(id);

            if (product == null)
            {
                return NotFound();
            }
            
            await _productService.RemoveAsync(product.Id);

            return new OkResult(); 
            // Вместо NoContext() используется кодрезалт200, потому что ноконтекст вернёт статускод204, а
            // библиотеки и другие программы плохо работают с кодами, отличными от 200/500/400,
            // поэтому чаще всего используется лишь стандартный набор кодов, поэтому вернём code OK 
        }
    }
}
