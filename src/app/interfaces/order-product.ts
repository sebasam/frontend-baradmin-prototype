export interface OrderProduct {
    productId: string;
    quantity: number;
}

export interface CreateOrderPayload {
    table: string;
    products: OrderProduct[];
    tip: boolean;
}
