import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../service/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('auth-token')
    if (token) {
      const reqUpdate = req.clone({
        // setHeaders: {
        //   Authorization: token
        // }
        headers: req.headers.set('Authorization', token)
      })
      return next.handle(reqUpdate)
    } else {
      return next.handle(req)
    }
  }

}
