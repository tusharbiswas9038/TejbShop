import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '@tejb/orders';
import { Product, ProductsService } from '@tejb/products';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'tejb-gaming-laptops',
  templateUrl: './gaming-laptops.component.html',
  styleUrls: ['./gaming-laptops.component.css']
})
export class GamingLaptopsComponent implements OnInit {
  products: Product[] = [];
  selected: string[] = ['625fc0c737f494e3e1f98b03'];
  addedToCart= false;
  constructor(private productsService: ProductsService,
    private toast: NgToastService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this._getProducts(this.selected);
  }
  private _getProducts(selected?: string[]) {
    this.productsService.getProducts(selected).subscribe((products) => {
      this.products = products;
    });
  }
  
  showSuccess() {
    this.toast.success({detail:"SUCCESS",summary:'Product added', duration:2000});
  }
  addToCart(id){
    const cartItem: CartItem={
      productId: id,
      quantity: 1
    };
    this.cartService.setCartItem(cartItem);
    this.addedToCart= true;
    this.showSuccess();
  }
  slide(direction) {
    const container = document.querySelector('div.extra-space');
    let scrollCompleted = 0;
    const slideVar = setInterval(() => {
      if (direction == 'left') {
        container.scrollLeft -= 10;
      } else {
        container.scrollLeft += 10;
      }
      scrollCompleted += 10;
      if (scrollCompleted >= 100) {
        window.clearInterval(slideVar);
      }
    }, 50);
  }
}
