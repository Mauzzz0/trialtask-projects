using Microsoft.EntityFrameworkCore;

namespace PryanikiTest.Models
{
    public class Product
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
    }
}