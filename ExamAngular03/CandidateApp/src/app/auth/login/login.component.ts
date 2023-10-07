import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';

import { LoginService } from 'src/app/services/auth/login.service';

import { LoginModel } from '../../models/login-model';
import { NotifyService } from '../../services/notify.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginModel: LoginModel = {};
  returnUrl: string = '/masterdetails';
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private loginSvc: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notifyService: NotifyService

  ) { }

  onSubmit() {
    if (this.loginForm.invalid) return;
    Object.assign(this.loginModel, this.loginForm.value);
    console.log(this.loginModel)
    this.loginSvc.login(this.loginModel).subscribe({
      next: r => {
        //console.log(r)
        this.loginSvc.emiter.emit('login');
        this.router.navigateByUrl(this.returnUrl);
      }
    });
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(q => {
        if (q['returnUrl']) {
          this.returnUrl = q['returnUrl'];
        }
      })
  }
}
