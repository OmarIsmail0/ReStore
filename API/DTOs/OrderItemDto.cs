namespace API.DTOs
{
    public class OrderItemDto
    {
        public int productId { get; set; }
        public long Price { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
        public int Quantity { get; set; }
    }
}