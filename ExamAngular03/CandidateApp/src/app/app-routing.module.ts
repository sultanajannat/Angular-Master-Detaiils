import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

import { MasterEditComponent } from './components/master-edit/master-edit.component';
import { MasterViewComponent } from './components/master-view/master-view.component';
import { MasterComponent } from './components/master/master.component';
import { AuthGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/masterdetails', pathMatch: 'full' },
  /*{ path: 'masterdetails', component: MasterViewComponent },*/
  { path: 'masterdetails/Create', component: MasterComponent },
  { path: 'masterdetails/Edit/:id', component: MasterEditComponent },
  { path: 'masterdetails', component: MasterViewComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin", "Staff"] } },
  { path: 'login', component: LoginComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
