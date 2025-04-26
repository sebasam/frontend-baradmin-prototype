import { OrderProduct } from "./order-product";

export interface Order {
    _id?: string;
    table: string;
    products: OrderProduct[];
    total: number;
    status: string;
    tip: boolean;
}
