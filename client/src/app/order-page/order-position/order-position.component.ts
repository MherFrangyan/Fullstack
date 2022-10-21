import { Component, OnInit } from '@angular/core';
import {map, Observable, switchMap} from "rxjs";
import {Position} from "../../shared/interface";
import {PositionsService} from "../../shared/service/positionsService";
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../order.service";
import {MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-order-position',
  templateUrl: './order-position.component.html',
  styleUrls: ['./order-position.component.scss']
})
export class OrderPositionComponent implements OnInit {
  positions$: Observable<Position[]>
  constructor(
    private positionService: PositionsService,
    private activateRoute: ActivatedRoute,
    private order: OrderService
  ) { }

  ngOnInit(): void {
    this.positions$ = this.activateRoute.params
      .pipe(
        switchMap((params) => {
          return this.positionService.getData(params['id'])
        }),
        map((position: Position[]) => {
          console.log(position, 'Position');
          return position.map(positionItem => {
            positionItem.quantity = 1;
            console.log(positionItem, 'positionItem');
            return positionItem
          })
        })
      )
  }

  addToOrder(position: Position) {
    console.log(position, ':Position')
    this.order.add(position);
    MaterialService.toast(`Added ${position.quantity}x`)
  }
}
