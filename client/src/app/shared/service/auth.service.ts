import {Injectable} from "@angular/core";
import {User} from "../interface";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  token: string = null;
  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${environment.backend_base_url}/api/auth/register`, user)
  }

  login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${environment.backend_base_url}/api/auth/login`, user)
      .pipe(
        tap(({token}) => {
            localStorage.setItem('auth-token', token)
            this.setToken(token)
        })
      )
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth-token')
  }

  logAuth() {
    this.setToken(null)
    localStorage.clear();
  }

}
