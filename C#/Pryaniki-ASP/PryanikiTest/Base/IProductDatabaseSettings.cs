namespace PryanikiTest.Base
{
    public interface IProductDatabaseSettings
    {
        string ProductsCollectionName { get; set; }
        string OrdersCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}