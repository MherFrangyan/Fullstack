import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category, Message} from "../interface";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.backend_base_url}/api/category`)
  }

  getById(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${environment.backend_base_url}/api/category/${categoryId}`)
  }

  creat(name: string, image?: File): Observable<Category> {
    let fd = new FormData()
    if (image) {
      fd.append('img', image)
    }
    fd.append('name', name)
    return this.http.post<Category>(`${environment.backend_base_url}/api/category`, fd)
  }

  update(id: string, name: string, image?: File): Observable<Category> {
    let fd = new FormData()
    if (image) {
      fd.append('img', image)
    }
    fd.append('name', name)
    return this.http.patch<Category>(`${environment.backend_base_url}/api/category/${id}`, fd)
  }

  delete(id: string):Observable<any> {
    return this.http.delete<any>(`${environment.backend_base_url}/api/category/${id}`)
  }

}
