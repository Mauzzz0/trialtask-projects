using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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
        
        /// <summary>
        /// Get all orders
        /// </summary>
        /// <returns>All orders</returns>
        public List<Order> Get() =>
            _orders.Find(order => true).ToList();

        /// <summary>
        /// Get all orders ASYNC
        /// </summary>
        /// <returns>All orders</returns>
        public async Task<List<Order>> GetAsync()
        {
            var result = await _orders.FindAsync(order => true);
            
            return result.ToList();
        }

        /// <summary>
        /// Get order by id
        /// </summary>
        /// <param name="id">String id</param>
        /// <returns>Instance of order</returns>
        public Order Get(string id) =>
            _orders.Find(order => order.Id == id).FirstOrDefault();

        /// <summary>
        /// Get order by id ASYNC
        /// </summary>
        /// <param name="id">String id</param>
        /// <returns>Instance of order</returns>
        public async Task<Order> GetAsync(string id)
        {
            var result = await _orders.FindAsync(order => order.Id == id);
            
            return result.FirstOrDefault();
        }
        
        /// <summary>
        /// Create new order
        /// </summary>
        /// <param name="order">Instance of order</param>
        /// <returns>New order</returns>
        /// <exception cref="Exception">If incorrect quantity</exception>
        public Order Create(Order order)
        {
            for (int i = 0; i < order.ProductId.Length; i++)
            {
                if (order.Quantity[i] > _productService.Get(order.ProductId[i]).Quantity)
                {
                    throw new Exception("Incorrect quantity");
                    /* Здесь неправильно, я понимаю. Отсюда должен вернуться
                    STATUSCODE: 400
                    {
                        message: "Incorrect quantity of product"
                    } */
                }
            }
            // Возможно, не лучшее решение - сначала перебирать все товары из списка с проверкой на правильность количества,
            // а только потом уменьшать его кол-во в коллекции с товарами и апдейтить.
            // Как вариант, объединить всё в одном цикле, сразу уменьшать кол-во товара, а при возникновении ошибки 
            // отменять все выполненные операции и возвращать кол-во.
            for (int i = 0; i < order.ProductId.Length; i++)
            {
                var product = _productService.Get(order.ProductId[i]);
                product.Quantity -= order.Quantity[i];
                _productService.Update(order.ProductId[i], product);
            }
            
            _orders.InsertOne(order);
            
            return order;
        }
        
        /// <summary>
        /// Create new order ASYNC
        /// </summary>
        /// <param name="order">Instance of order</param>
        /// <returns>New order</returns>
        /// <exception cref="Exception">If incorrect quantity</exception>
        public async Task<Order> CreateAsync(Order order)
        {
            for (int i = 0; i < order.ProductId.Length; i++)
            {
                var result = await _productService.GetAsync(order.ProductId[i]);
                
                if (order.Quantity[i] > result.Quantity)
                {
                    throw new Exception("Incorrect quantity");
                    /* Здесь неправильно, я понимаю. Отсюда должен вернуться
                    STATUSCODE: 400
                    {
                        message: "Incorrect quantity of product"
                    } */
                }
            }
            // Возможно, не лучшее решение - сначала перебирать все товары из списка с проверкой на правильность количества,
            // а только потом уменьшать его кол-во в коллекции с товарами и апдейтить.
            // Как вариант, объединить всё в одном цикле, сразу уменьшать кол-во товара, а при возникновении ошибки 
            // отменять все выполненные операции и возвращать кол-во.
            for (int i = 0; i < order.ProductId.Length; i++)
            {
                var product = await _productService.GetAsync(order.ProductId[i]);
                product.Quantity -= order.Quantity[i];
                await _productService.UpdateAsync(order.ProductId[i], product);
            }
            
            await _orders.InsertOneAsync(order);
            
            return order;
        }
        
        /// <summary>
        /// Update order
        /// </summary>
        /// <param name="id">String id</param>
        /// <param name="orderIn">New order</param>
        /// <exception cref="NotImplementedException">Not implemented</exception>
        public void Update(string id, Order orderIn) => throw new NotImplementedException();
            // _orders.ReplaceOne(order => order.Id == id, orderIn);
        
        /// <summary>
        /// Remove order by instance
        /// </summary>
        /// <param name="orderIn">Instance of order</param>
        /// <exception cref="NotImplementedException">Not implemented</exception>
        public void Remove(Order orderIn) => throw new NotImplementedException();
            // _orders.DeleteOne(order => order.Id == orderIn.Id);
        
            
        /// <summary>
        /// Remove order by id ASYNC
        /// </summary>
        /// <param name="id">String id</param>
        public async Task RemoveAsync(string id)
        {
            var order = await GetAsync(id);
            
            for (int i = 0; i < order.ProductId.Length; i++)
            {
                var product = await _productService.GetAsync(order.ProductId[i]);
                product.Quantity += order.Quantity[i];
                await _productService.UpdateAsync(order.ProductId[i], product);
            }
            
            await _orders.DeleteOneAsync(ord => ord.Id == id);
        }
        
        /// <summary>
        /// Remove order by id ASYNC
        /// </summary>
        /// <param name="id">String id</param>
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
        
        /// <summary>
        /// Remove all records. 
        /// </summary>
        /// <exception cref="NotImplementedException">Not implemented</exception>
        public void Remove() => throw new NotImplementedException();
        // _orders.DeleteMany(order => true);
    }
}