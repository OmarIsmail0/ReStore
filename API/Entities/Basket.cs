using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int id { get; set; }
        public string BuyerId { get; set; }
        
        public List<BasketItem> Items { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
            if (Items.All(item => item.ProductID != product.Id))
            {
                Items.Add(new BasketItem { Product = product, Quantity = quantity });
            }

            var existingItem = Items.FirstOrDefault(item => item.ProductID == product.Id);
            if (existingItem != null) existingItem.Quantity += quantity;
        }

        public void RemoveItem(int prodcutId, int quntity)
        {
            var existingItem = Items.FirstOrDefault(item => item.ProductID == prodcutId);
            if (existingItem != null) existingItem.Quantity -= quntity;
            if (existingItem.Quantity <= 0) Items.Remove(existingItem);
        }
    }
}