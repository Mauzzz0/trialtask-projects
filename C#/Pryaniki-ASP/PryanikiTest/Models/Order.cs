using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace PryanikiTest.Models
{
    public class Order
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfDefault]
        public string Id { get; set; }
        
        [BsonElement("ProductId")]
        [JsonProperty("ProductId")]
        public string[] ProductId { get; set; }

        [BsonElement("Quantity")]
        [JsonProperty("Quantity")]
        public int[] Quantity { get; set; }
    }
}