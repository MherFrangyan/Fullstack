import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {AnalyticsService} from "../shared/service/analytics.service";
import {Subject, takeUntil} from "rxjs";
import {AnalyticsData} from "../shared/interface";
import {Chart, registerables} from "chart.js";

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gain') gainRef: ElementRef;
  @ViewChild('order') orderRef: ElementRef;
  unsubscribe: Subject<any> = new Subject<any>()
  totalPrice: number;
  padding = true;

  constructor(private analyticsService: AnalyticsService) {
    Chart.register(...registerables);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(1)
    this.unsubscribe.complete();
  }

  ngAfterViewInit(): void {
    const gainConfig: any = {
      label: 'Выручка',
      color: 'rgb(255,99,32)'
    }

    const orderConfig: any = {
      label: 'Заказы',
      color: 'rgb(54,162,235)'
    }

    this.analyticsService.getAnalytics().pipe(
      takeUntil(this.unsubscribe)
    ).subscribe((data: AnalyticsData) => {
      this.totalPrice = data.totalPrice
      this.padding = false;

      // gain Chart.js
      gainConfig.labels = data.chart.map(item => item.label)
      gainConfig.data = data.chart.map(item => item.gain)

      const gainCtx = this.gainRef.nativeElement.getContext('2d')
      gainCtx.canvas.height = '300px'
      new Chart(gainCtx, createChartConfig(gainConfig))

      // Orders chart.js
      orderConfig.labels = data.chart.map(item => item.label)
      orderConfig.data = data.chart.map(item => item.order)

      const orderCtx = this.orderRef.nativeElement.getContext('2d')
      orderCtx.canvas.height = '300px'
      new Chart(orderCtx, createChartConfig(orderConfig))

    })
  }
}

function createChartConfig(config: any): any {
  return {
    type: 'line',
    data: {
      labels: config.labels,
      datasets: [
        {
          label: config.label,
          data: config.data,
          borderColor: config.color,
        }
      ]
    },
  }
}
