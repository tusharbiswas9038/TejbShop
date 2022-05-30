import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, OrdersService } from '@tejb/orders';

@Component({
  selector: 'tejb-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {

  constructor(private router:Router,
    private orderService: OrdersService,
    private cartService: CartService
    ) { }

  ngOnInit(): void {
   const orderData = this.orderService.getCachedOrderData();
   this.orderService.createOrder(orderData).subscribe(
    () => {
      this.cartService.emptyCart();
      this.orderService.removeCachedOrderData();
    }
  );
  }



  backToshopping(){
this.router.navigateByUrl('');
  }
}
