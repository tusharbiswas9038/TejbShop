import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@tejb/orders';
import { ProductsService } from '@tejb/products';
import { Subject, take, takeUntil } from 'rxjs';


@Component({
  selector: 'tejb-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  totalPrice = 0;
  isCheckout = false;
  constructor(
    private cartService: CartService,
    private productService: ProductsService,
    private router: Router,
  ) {
    this.router.url.includes('checkout')
      ? (this.isCheckout = true)
      : (this.isCheckout = false);
  }
  endSub$: Subject<unknown> = new Subject();
  ngOnInit(): void {
    this._getcartdetails();
  }

  ngOnDestroy(): void {
    this.endSub$.next(true);
    this.endSub$.complete();
  }

  // _placeorder(){
  //   this.checkout.placeOrder();
  // }
  

  _getcartdetails() {
    this.cartService.cart$.pipe(takeUntil(this.endSub$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items.map((item) => {
          this.productService
            .getProduct(item.productId)
            .pipe(take(1))
            .subscribe((product) => {
              this.totalPrice += product.price * item.quantity;
            });
        });
      }
    });
  }
}
