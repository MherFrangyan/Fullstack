import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Message, Position} from "../interface";

@Injectable({
  providedIn: 'root'
})

export class PositionsService{

  constructor(private http: HttpClient) {
  }

  getData(id: string): Observable<Position[]> {
    return this.http.get<Position[]>(`${environment.backend_base_url}/api/position/${id}`)
  }

  create(position: Position): Observable<Position> {
    return this.http.post<Position>(`${environment.backend_base_url}/api/position/`, position)
  }

  update(position: Position): Observable<Position> {
    return this.http.patch<Position>(`${environment.backend_base_url}/api/position/${position._id}`, position)
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`${environment.backend_base_url}/api/position/${id}`)
  }

}
