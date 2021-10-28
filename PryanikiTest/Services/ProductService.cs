using PryanikiTest.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using PryanikiTest.Base;

namespace PryanikiTest.Services
{
    public class ProductService
    {
        private readonly IMongoCollection<Product> _products;
        public ProductService(IProductDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var db = client.GetDatabase(settings.DatabaseName);

            _products = db.GetCollection<Product>(settings.ProductsCollectionName);
        }
        
        /// <summary>
        /// Get all records of product
        /// </summary>
        /// <returns></returns>
        public List<Product> Get() =>
            _products.Find(product => true).ToList();
        
        /// <summary>
        /// Get all records of product ASYNC
        /// </summary>
        /// <returns></returns>
        public async Task<IAsyncCursor<Product>> GetAsync() =>
           await _products.FindAsync(product => true);
        
        /// <summary>
        /// Get one product by id
        /// </summary>
        /// <param name="id">String id</param>
        /// <returns>Instance of product</returns>
        public Product Get(string id) =>
            _products.Find(product => product.Id == id).FirstOrDefault();

        /// <summary>
        /// Get one product by id ASYNC
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Product> GetAsync(string id)
        {
            var result = await _products.FindAsync(product => product.Id == id);
            
            return result.FirstOrDefault();
        }
            
        
        /// <summary>
        /// Create new product
        /// </summary>
        /// <param name="product">New product</param>
        /// <returns>Instance of created product</returns>
        public void Create(Product product) => 
            _products.InsertOne(product);
        
        
        /// <summary>
        /// Create new product ASYNC
        /// </summary>
        /// <param name="product">New product</param>
        /// <returns>Instance of created product</returns>
        public async Task CreateAsync(Product product) => 
            await _products.InsertOneAsync(product);
        
        /// <summary>
        /// Update product
        /// </summary>
        /// <param name="id">String id</param>
        /// <param name="productIn">Updated product</param>
        public void Update(string id, Product productIn) => 
            _products.ReplaceOne(prod => prod.Id == id, productIn);
        
        /// <summary>
        /// Update product ASYNC
        /// </summary>
        /// <param name="id">String id</param>
        /// <param name="productIn">Updated product</param>
        public async Task UpdateAsync(string id, Product productIn) => 
            await _products.ReplaceOneAsync(prod => prod.Id == id, productIn);
        
        /// <summary>
        /// Remove product by instance
        /// </summary>
        /// <param name="productIn">Product instance</param>
        public void Remove(Product productIn) =>
            _products.DeleteOne(product => product.Id == productIn.Id);
        
        /// <summary>
        /// Remove product by id
        /// </summary>
        /// <param name="id">String id</param>
        public void Remove(string id) => 
            _products.DeleteOne(product => product.Id == id);
        
        /// <summary>
        /// Remove product by id ASYNC
        /// </summary>
        /// <param name="id">String id</param>
        public async Task RemoveAsync(string id) => 
            await _products.DeleteOneAsync(product => product.Id == id);
        
        /// <summary>
        /// Remove all records
        /// </summary>
        public void Remove() =>
            _products.DeleteMany(product => true);
    }
}