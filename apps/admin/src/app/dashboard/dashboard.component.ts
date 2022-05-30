import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@tejb/orders';
import { ProductsService } from '@tejb/products';
import { UsersService } from '@tejb/users';
import { combineLatest } from 'rxjs';

@Component({
    //  eslint-disable-next-line @angular-eslint/component-selector
    selector: 'tejb-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
  })
export class DashboardComponent implements OnInit {
  statistics = [];
  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.userService.getUsersCount(),
      this.productService.getProductsCount(),
      this.ordersService.getOrdersCount(),
      this.ordersService.getTotalSales()
    ]).subscribe((values) => {
      this.statistics = values;
    });
  }
}









