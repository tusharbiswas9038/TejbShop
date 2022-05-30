import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '@tejb/orders';
import { CategoriesService, Category, Product, ProductsService } from '@tejb/products';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'tejb-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
   products: Product [] = [];
   categories: Category []=[];
selection: string[];
addedToCart= false;

  constructor(
    private productsService:ProductsService,
    private categoriesService:CategoriesService,
    private toast: NgToastService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this._categories(); 
  }

  private _categories(){
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories[0] = categories[2];
      this.categories[1] = categories[3];
      this.selection = this.categories.map(cat=>cat.id)
      this._getProducts(this.selection);
    });
  }


  
  categoryfilter(){
    const selected=this.categories.filter(categories => categories.checked)
    .map(categories=>categories.id);
    if(selected.length === 0){
      this._getProducts(this.selection);
    }else{
      this._getProducts(selected);
    }
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
  private _getProducts(selected?:string[]) {
    this.productsService.getProducts(selected).subscribe((products) => {
      this.products = products;
    });
  }
}


