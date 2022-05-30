import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartItemDetailed, CartService } from '@tejb/orders';
import { ProductsService } from '@tejb/products';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'tejb-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit, OnDestroy {

   cartItemDetailed: CartItemDetailed[]=[];
  constructor(private cartService: CartService, private productService:ProductsService) { }
  endSub$ : Subject<unknown>= new Subject();
  ngOnInit(): void {
    this._getcartdetails();
  }

  ngOnDestroy(): void {
      // this.endSub$.next();
      this.endSub$.complete();
  }

_getcartdetails(){
  this.cartService.cart$.pipe(takeUntil(this.endSub$)).subscribe((respcart)=>{
    this.cartItemDetailed=[];
    respcart.items.forEach((cartItem)=>{
      this.productService.getProduct(cartItem.productId).subscribe((respproduct)=>{
        this.cartItemDetailed.push({
          productId: respproduct,
          quantity: cartItem.quantity
        })
      })
    })
  })
}

deleteCart(cartItem:CartItemDetailed){
  this.cartService.deleteCartItem(cartItem.productId.id);
}

}
