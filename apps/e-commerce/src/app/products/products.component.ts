import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@tejb/orders';
import { Product, ProductsService } from '@tejb/products';
import { Subject, takeUntil } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'tejb-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
 @Input() product:Product;
  endSub$:Subject<boolean>= new Subject();
  selectedImg:string;
  addedToCart= false;
  constructor(
    private productService:ProductsService,
    private route:ActivatedRoute,
    private toast: NgToastService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      if(params.productid){
        this._getProduct(params.productid);
      }
    }    
    )
  }
  showSuccess() {
    this.toast.success({detail:"SUCCESS",summary:'Product added', duration:2000});
  }

  addToCart(){
    const cartItem: CartItem={
      productId: this.product.id,
      quantity: 1
    };
    this.cartService.setCartItem(cartItem);
    this.addedToCart= true;
    this.showSuccess();
  }

  ngOnDestroy(): void {
      this.endSub$.next(true);
      this.endSub$.complete();
  }

onSelect(image:string){
  this.selectedImg=image;
}

  private _getProduct(id: string){
    this.productService.getProduct(id).pipe(takeUntil(this.endSub$)).subscribe(product=>{
      this.product=product;})
  }
}
