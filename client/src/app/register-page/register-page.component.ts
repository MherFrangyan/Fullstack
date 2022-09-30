import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Params, Router} from "@angular/router";
import {AuthService} from "../shared/service/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public aSub: Subscription;

  constructor(public authService: AuthService,
              public route: Router) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnDestroy() {
    this.aSub ? this.aSub.unsubscribe() : ''
  }

  public onSubmit() {
    this.form.disable()
    this.aSub = this.authService.register(this.form.value).subscribe(
      res => {
        console.log(res);
        this.route.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        })
      },
      error => {
        console.warn(error)
        this.form.enable()
      })
  }

}
