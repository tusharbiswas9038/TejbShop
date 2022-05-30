/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Product } from "@tejb/products";

export class Cart {
    items?: CartItem[];
}

export class CartItem{
    productId?: string;
    quantity?: number;
}

export class CartItemDetailed{
    productId?: Product;
    quantity?: number;
}

