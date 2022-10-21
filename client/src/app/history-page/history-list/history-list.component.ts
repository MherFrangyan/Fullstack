import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Order} from "../../shared/interface";
import {MaterialService, ModalInitial} from "../../shared/classes/material.service";

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnDestroy, AfterViewInit{
  @Input() orders: Order[] = [];
  @ViewChild('modal') modalRef: ElementRef;
  selectedOrders: Order;
  modal: ModalInitial;

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }
  computePrice(order: Order): Number {
    return order.list.reduce((total: number, step) => {
          return total += step.quantity * step.cost
    },0)
  }

  selectOrder(order: Order) {
    this.selectedOrders = order;
    this.modal.open();
  }

  closeModal() {
    this.modal.close();
  }
}
