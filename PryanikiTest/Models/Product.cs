using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace PryanikiTest.Models
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfDefault]
        public string Id { get; set; }
        [BsonElement("Title")]
        [JsonProperty("Title")]
        public string Title { get; set; }
        [BsonElement("Description")]
        [JsonProperty("Description")]
        public string Description { get; set; }
        [BsonElement("Price")]
        [JsonProperty("Price")]
        public double Price { get; set; }
    }
}