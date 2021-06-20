using PryanikiTest.Models;
using System.Collections.Generic;
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
        /// Get one product by id
        /// </summary>
        /// <param name="id">String id</param>
        /// <returns>Instance of product</returns>
        public Product Get(string id) =>
            _products.Find(product => product.Id == id).FirstOrDefault();
        
        /// <summary>
        /// Create new product
        /// </summary>
        /// <param name="product">New product</param>
        /// <returns>Instance of created product</returns>
        public Product Create(Product product)
        {
            _products.InsertOne(product);
            return product;
        }
        
        /// <summary>
        /// Update product
        /// </summary>
        /// <param name="id">String id</param>
        /// <param name="productIn">Updated product</param>
        public void Update(string id, Product productIn) => 
            _products.ReplaceOne(prod => prod.Id == id, productIn);
        
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
        /// Remove all records
        /// </summary>
        public void Remove() =>
            _products.DeleteMany(product => true);
    }
}