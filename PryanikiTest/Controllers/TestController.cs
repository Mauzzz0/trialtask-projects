using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using PryanikiTest.Models;
using PryanikiTest.Services;

namespace PryanikiTest.Controllers
{
    [Route("api/test")]
    [Produces("application/json")]
    public class TestController : ControllerBase
    {
        private readonly ProductService _productService;
        
        public TestController(ProductService productService)
        {
            _productService = productService;
        }
        
        [HttpPost]
        public ActionResult Create()
        {
            _productService.Remove();
            
            _productService.Create(new Product {Title = "TV", Description = "TVdesc", Price = 1500, Quantity = 15});
            _productService.Create(new Product {Title = "Camera", Description = "Cameradesc", Price = 800, Quantity = 9});
            _productService.Create(new Product {Title = "Radio", Description = "Radiodesc", Price = 300, Quantity = 32});
            _productService.Create(new Product {Title = "Audio", Description = "Audiodesc", Price = 650, Quantity = 19});
            
            return new JsonResult("Created various products");
        }

        [HttpDelete]
        public ActionResult Delete()
        {
            _productService.Remove();
            
            return new JsonResult("DB wiped");
        }
    }
}