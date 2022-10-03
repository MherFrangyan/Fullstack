import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/service/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {MaterialService} from "../shared/classes/material.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public aSub: Subscription;
  constructor(
    public authService: AuthService,
    private route: Router,
    public activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.activatedRoute.queryParams.subscribe((parms: Params) => {
        if (parms['registered']) {
          // alredy exist
          MaterialService.toast('Log in with email and password')
        } else if(parms['accessDenied']) {
          MaterialService.toast('You need to login or register on the page')
          // register on web page
        } else if (parms['sessionExpired']) {
          MaterialService.toast('session has expired, please login again')
        }
    })
  }

  ngOnDestroy() {
    this.aSub ? this.aSub.unsubscribe() : ''
  }

  public onSubmit() {
    this.form.disable()
    this.aSub = this.authService.login(this.form.value).subscribe(
      res => {
        console.log(res);
        this.route.navigate(['/overview'])
      },
      error => {
        MaterialService.toast(error.error.message)
        console.warn(error)
        this.form.enable()
      })
  }

}
