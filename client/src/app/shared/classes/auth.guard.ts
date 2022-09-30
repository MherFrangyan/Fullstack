import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {AuthService} from "../service/auth.service";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(public authService: AuthService,
              public route: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.authService.isAuthenticated()){
      return of(true)
    } else {
      this.route.navigate(['/login'], {
        queryParams: {
          accessDenied: true
        }
      })
      return of(false)
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

}

