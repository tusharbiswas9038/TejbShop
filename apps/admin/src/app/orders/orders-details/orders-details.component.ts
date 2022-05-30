import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@tejb/orders';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
// import { Observable } from 'rxjs';
// import { ORDER_STATUS } from '../order.constants';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tejb-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.css'],
})
export class OrdersDetailsComponent implements OnInit {
  orders: Order;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedStatus: number;
  updated = false;
  orderStatuses= [];

  constructor(
    private orderService: OrdersService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.orderService.getOrder(params.id).subscribe((orders) => {
          this.orders = orders;
          this.selectedStatus = orders.status;
        });
      }
    });
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      };
    });
  }

  onStatusChange(event) {
    this.orderService
      .updateOrder({ status: event.target.value }, this.orders.id)
      .subscribe(() => {
        this.updated = true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        timer(2000)
          .toPromise()
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .then((_done) => {
            this.location.back();
          });
      });
  }
}
