export interface Order {
    id: number
    buyerId: string
    shippingAdress: ShippingAdress
    orderDate: string
    orderItems: OrderItem[]
    subTotal: number
    deliveryFee: number
    orderStatus: string
    total: number
}

export interface ShippingAdress {
    fullName: string
    address1: string
    address2: string
    city: string
    state: string
    zip: string
    country: string
}

export interface OrderItem {
    productId: number
    price: number
    name: string
    pictureUrl: string
    quantity: number
}
