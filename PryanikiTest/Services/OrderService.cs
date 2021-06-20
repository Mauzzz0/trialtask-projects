using System;
using System.Collections.Generic;
using MongoDB.Driver;
using PryanikiTest.Base;
using PryanikiTest.Models;

namespace PryanikiTest.Services
{
    public class OrderService
    {
        private readonly IMongoCollection<Order> _orders;
        private readonly ProductService _productService;
        public OrderService(IProductDatabaseSettings settings, ProductService productService)
        {
            var client = new MongoClient(settings.ConnectionString);
            var db = client.GetDatabase(settings.DatabaseName);

            _productService = productService;
            _orders = db.GetCollection<Order>(settings.OrdersCollectionName);
        }
        
        public List<Order> Get() =>
            _orders.Find(order => true).ToList();

        public Order Get(string id) =>
            _orders.Find(order => order.Id == id).FirstOrDefault();

        public Order Create(Order order)
        {
            for (int i = 0; i < order.ProductId.Length; i++)
            {
                if (order.Quantity[i] > _productService.Get(order.ProductId[i]).Quantity)
                {
                    // Обработка некорректного ввода
                }
            }
            
            for (int i = 0; i < order.ProductId.Length; i++)
            {
                var product = _productService.Get(order.ProductId[i]);
                product.Quantity -= order.Quantity[i];
                _productService.Update(order.ProductId[i], product);
            }
            
            
            _orders.InsertOne(order);
            return order;
        }

        public void Update(string id, Order orderIn) => throw new NotImplementedException();
            // _orders.ReplaceOne(order => order.Id == id, orderIn);

        public void Remove(Order orderIn) => throw new NotImplementedException();
            // _orders.DeleteOne(order => order.Id == orderIn.Id);

        public void Remove(string id)
        {
            var order = Get(id);
            
            for (int i = 0; i < order.ProductId.Length; i++)
            {
                var product = _productService.Get(order.ProductId[i]);
                product.Quantity += order.Quantity[i];
                _productService.Update(order.ProductId[i], product);
            }
            
            _orders.DeleteOne(ord => ord.Id == id);
            
        }

        public void Remove() => throw new NotImplementedException();
        // _orders.DeleteMany(order => true);
    }
}