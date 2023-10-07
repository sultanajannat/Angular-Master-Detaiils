import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  config = {
    paddingAtStart: true,
    interfaceWithRoute: true,

    fontColor: `rgb(8, 54, 71)`,


  };
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService
  ) { }
  get isLoggedIn() {
    return this.userService.isLoggedin;
  }
  get userName() {
    return this.userService.Username;
  }
  logout() {
    this.userService.signOut();
  }
}
