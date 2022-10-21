import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {MaterialService, ModalInitial} from "../shared/classes/material.service";
import {OrderService} from "./order.service";
import {OrdersService} from "../shared/service/orders.service";
import {Order} from "../shared/interface";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modal') modalRef: ElementRef;
  isRoot: boolean;
  modal: ModalInitial;
  pending: boolean = false;
  unsubscribe$: Subject<any> = new Subject()
  constructor(private route: Router,
              private ordersService: OrdersService,
              public order: OrderService) {
  }


  ngOnInit(): void {
    this.isRoot = this.route.url === '/order'
    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.route.url === '/order'
      }
    })
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
    this.modal.destroy()
  }

  close() {
    this.modal.close()
  }

  submit() {
    this.pending = true;
    const order: Order = {
      list: this.order.list.map(item => {
        delete item._id
        return item
      })
    }
    this.ordersService.create(order).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      newOrder => {
        MaterialService.toast(`Order ${newOrder.order} successfully confirmed`)
      },
      error => {
        MaterialService.toast(error.error.message)
      }, () => {
        this.order.clear()
        this.modal.close();
        this.pending = false;
      })
  }

  delete(orderId: string) {
    this.order.remove(orderId)
  }
}
