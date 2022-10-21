import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialService, ModalInitial} from "../shared/classes/material.service";
import {OrdersService} from "../shared/service/orders.service";
import {Subject, takeUntil} from "rxjs";
import {Filter, Order} from "../shared/interface";

const STEP = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip: ModalInitial;
  order: Order[] = [];
  filter: Filter = {};
  unSub: Subject<any> = new Subject()
  isShowFilter = false;
  offset = 0;
  limit = STEP;
  loader = false;
  reloading = false;
  noMoreOrders = true;

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.fetch();
    this.reloading = true;
  }

  private fetch() {
    this.loader = true;
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    })
    this.ordersService.fetch(params).pipe(
      takeUntil(this.unSub)
    ).subscribe((orders: Order[]) => {
      this.order = this.order.concat(orders);
      this.loader = false;
      this.reloading = false;
      this.noMoreOrders = orders.length < STEP
    })
  }

  ngAfterViewInit(): void {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef)
  }

  ngOnDestroy(): void {
    this.tooltip.destroy()
    this.unSub.next(1);
    this.unSub.complete();
  }

  uploadData() {
    this.offset += STEP;
    this.fetch()
  }

  applyFilter(filter: Filter) {
    this.order = [];
    this.offset = 0;
    this.reloading = true;
    this.filter = filter
    this.fetch()
    console.log(this.filter, 'filter')
  }

  isFilterBtn(): boolean {
    return Object.keys(this.filter).length !== 0
  }
}
