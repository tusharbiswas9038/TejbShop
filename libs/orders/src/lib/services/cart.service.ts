import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart$: BehaviorSubject<Cart>= new BehaviorSubject(this.getCart());


  initCartLocalStorage(){
    const cart:Cart = this.getCart();
    if(!cart){
    const intialCart = {
      items:[]
    };
    const intialCartJson = JSON.stringify(intialCart);
    localStorage.setItem('cart', intialCartJson);
  }
}

  getCart():Cart{
    const cartJsonString: string = localStorage.getItem('cart') ;
    const cart: Cart = JSON.parse(cartJsonString);
    return cart;
  }

  setCartItem(cartItem:CartItem):Cart{

    const cart = this.getCart();
    const cartItemExist = cart.items?.find((item)=> item.productId === cartItem.productId)
    if (cartItemExist){
      cart.items?.map((item)=> {
        if(item.productId === cartItem.productId){
          item.quantity = (item.quantity ?? 0) + (cartItem.quantity ?? 0);
          
        }
      });
    }else {
      cart.items?.push(cartItem);
    }
    const cartJson = JSON.stringify(cart);
    localStorage.setItem('cart', cartJson);
    this.cart$.next(cart);
    return cart;
  }

  emptyCart() {
    const intialCart = {
      items: []
    };
    const intialCartJson = JSON.stringify(intialCart);
    localStorage.setItem('cart', intialCartJson);
    this.cart$.next(intialCart);
  }

  deleteCartItem(productId:string){
  const cart = this.getCart();
  const newCart= cart.items?.filter(item=>item.productId !== productId)
  cart.items= newCart;

  const cartJsonString = JSON.stringify(cart);
    localStorage.setItem('cart', cartJsonString);
    this.cart$.next(cart);
  }

}
