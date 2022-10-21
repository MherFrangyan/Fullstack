import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order, OrderPosition} from "../interface";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})

export class OrdersService {

  constructor(private http: HttpClient) {
  }

  public create(positionData: Order): Observable<Order> {
    return this.http.post<Order>(`${environment.backend_base_url}/api/order`, positionData)
  }

  public fetch(params: any = {}): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.backend_base_url}/api/order`, {
      params: new HttpParams({
        fromObject: params
      })
    });
  }

}
