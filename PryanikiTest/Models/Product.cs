using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PryanikiTest.Models
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("Title")]
        public string Title { get; set; }
        [BsonElement("Description")]
        public string Description { get; set; }
        [BsonElement("Price")]
        public double Price { get; set; }
    }
}