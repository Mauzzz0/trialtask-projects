using PryanikiTest.Base;

namespace PryanikiTest.Models
{
    public class ProductDatabaseSettings : IProductDatabaseSettings
    {
        public string ProductsCollectionName { get; set; }
        public string OrdersCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}