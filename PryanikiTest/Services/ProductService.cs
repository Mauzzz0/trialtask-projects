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
        public List<Product> Get() =>
            _products.Find(product => true).ToList();

        public Product Get(string id) =>
            _products.Find(product => product.Id == id).FirstOrDefault();

        public Product Create(Product product)
        {
            _products.InsertOne(product);
            return product;
        }

        public void Update(string id, Product productIn) => 
            _products.ReplaceOne(prod => prod.Id == id, productIn);

        public void Remove(Product productIn) =>
            _products.DeleteOne(product => product.Id == productIn.Id);

        public void Remove(string id) => 
            _products.DeleteOne(product => product.Id == id);
    }
}