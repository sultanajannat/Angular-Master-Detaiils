import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MasterComponent } from './components/master/master.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MasterViewComponent } from './components/master-view/master-view.component';
import { MasterEditComponent } from './components/master-edit/master-edit.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoginComponent } from './auth/login/login.component';
import { DatePipe } from '@angular/common';

import { AuthGuard } from './guards/auth-guard.guard';
import { LoginService } from './services/auth/login.service';
import { UserService } from './services/auth/user.service';
import { JwtInterceptor } from './jwt-interceptor.interceptor';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';


import { MatFormFieldModule } from '@angular/material/form-field';
import { NotifyService } from './services/notify.service';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MasterComponent,
    MasterEditComponent,
    MasterViewComponent,
    ConfirmDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatGridListModule,
    MatIconModule,
    MatSlideToggleModule,
    MatFormFieldModule
  ],
  providers: [DatePipe, HttpClient, NotifyService, AuthGuard,
    LoginService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
