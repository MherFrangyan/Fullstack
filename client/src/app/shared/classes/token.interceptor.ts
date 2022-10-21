import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public route: Router) {
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

      return next.handle(reqUpdate).pipe(
        catchError((err: HttpErrorResponse) => this.handleAuthError(err))
        )
    }
    return next.handle(req)
  }
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
      if (err.status === 401) {
        localStorage.clear()
        this.route.navigate(['/login'], {
          queryParams: {
            sessionExpired: true
          }
        })
      }
      return throwError(err)
  }
}
