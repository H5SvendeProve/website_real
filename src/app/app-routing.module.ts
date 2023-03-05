import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentListComponent } from './componets/appointment-list/appointment-list.component';
import { HomeComponent } from './componets/home/home.component';
import { LoginComponent } from './componets/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'appointment-list',
    component: AppointmentListComponent
  },
  {
    path: 'login',
    component : LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
