import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { LoginModel } from '../../models/login-model';
import { UserModel } from '../../models/user-model';


@Injectable({
  providedIn: 'root'
})

export class LoginService {
  userData: UserModel | null = null;
  @Output() loginEvent: EventEmitter<string> = new EventEmitter<string>();
  constructor(private http: HttpClient) { }
  login(data: LoginModel) {
    //console.log(`${apiUrl}/api/Account/Login`)
    return this.http.post<any>(`http://localhost:5041/api/Account/Login`, data)
      .pipe(
        map((x) => {
          //console.log(x);
          const payload = JSON.parse(window.atob(x.token.split('.')[1]));
          //console.log(payload)
          let user: UserModel = { username: payload.username, token: x.token, role: payload.role };
          this.save(user);
          this.userData = this.getUser();
          this.loginEvent.emit('login');
          return user;
        }), catchError(err => {
          this.userData = null;
          console.log(err);
          return throwError(() => err);
        })
      );
  }
  save(data: UserModel) {
    console.log(data);
    sessionStorage.setItem('user-data', JSON.stringify(data));
  }
  getUser(): UserModel | null {
    let savedData = sessionStorage.getItem('user-data');
    if (savedData) {
      let user: UserModel = JSON.parse(savedData) as UserModel;
      // console.log(user)
      return user
    }
    else {
      return null;
    }
  }
  logout() {
    sessionStorage.removeItem('user-data');
    this.userData = null;
    this.loginEvent.emit('logout');
  }
  get emiter() {
    return this.loginEvent;
  }
}
