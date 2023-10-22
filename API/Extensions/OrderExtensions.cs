using API.DTOs;
using API.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> ProjectOrderToOrderDto(this IQueryable<Order> query)
        {
            return query
            .Select(order => new OrderDto
            {
                Id = order.Id,
                BuyerId = order.BuyerId,
                OrderDate = order.OrderDate,
                ShippingAdress = order.ShippingAdress,
                DeliveryFee = order.DeliveryFee,
                SubTotal = order.SubTotal,
                OrderStatus = order.OrderStatus.ToString(),
                Total = order.GetTotal(),
                OrderItems = order.OrderItems.Select(item => new OrderItemDto
                {
                    Name = item.ItemOrdered.Name,
                    productId = item.ItemOrdered.ProductId,
                    PictureUrl = item.ItemOrdered.PictureUrl,
                    Price = item.Price,
                    Quantity = item.Quantity,
                }).ToList()
            }).AsNoTracking();
        }
    }
}