import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AnalyticsService} from "../shared/service/analytics.service";
import {Observable} from "rxjs";
import {OverviewPage} from "../shared/interface";
import {MaterialService, ModalInitial} from "../shared/classes/material.service";

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tapTarget') tapTargetRef: ElementRef;
  tapTarget: ModalInitial;
  data$: Observable<OverviewPage>;
  yesterdayDate: Date = new Date()

  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {
    this.yesterdayDate.setDate(this.yesterdayDate.getDate() - 1)
    this.data$ = this.analyticsService.getOverview()
  }

  ngOnDestroy(): void {
    this.tapTarget.destroy();
  }

  ngAfterViewInit(): void {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef)
  }


  openTapTarget() {
    this.tapTarget.open();
  }
}
