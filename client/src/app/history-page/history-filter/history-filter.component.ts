import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Filter} from "../../shared/interface";
import {MaterialDatePicker, MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() onFilter = new EventEmitter<Filter>()
  @Output() onClearFilter = new EventEmitter<Filter>()
  @ViewChild('start') startRef: ElementRef;
  @ViewChild('end') endRef: ElementRef;
  startDate: MaterialDatePicker;
  endDate: MaterialDatePicker;
  order: number;
  isFilterBtn: boolean;
  isValidate: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.startDate.destroy();
    this.endDate.destroy();
  }

  ngAfterViewInit(): void {
    //this i mijocov poxum enq konteksty vor chvercni datePickeri this-y
    this.startDate = MaterialService.initDatePicker(this.startRef, this.validate.bind(this))
    this.endDate = MaterialService.initDatePicker(this.endRef, this.validate.bind(this))
  }

  validate() {
    if (!this.startDate.date || !this.endDate.date) {
      this.isFilterBtn = false;
      return
    }
    if (this.startDate.date && this.endDate.date) {
      this.isFilterBtn = this.startDate.date < this.endDate.date
    }
    console.log(this.isValidate,'ssssssss')
  }

  submitFilter() {
    const filter: Filter = {}
    if (this.order) {
      filter.order = this.order
    }
    if (this.startDate.date) {
      filter.start = this.startDate.date
    }
    if (this.endDate.date) {
      filter.end = this.endDate.date
    }
    this.onFilter.emit(filter)
  }


  clearFilter() {
    this.onFilter.emit({})
  }
}
