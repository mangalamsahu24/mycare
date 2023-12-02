import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './component/login/login.component';
import { AppointmentComponent } from './component/appointment/appointment.component';
import { RegisterComponent } from './component/register/register.component';
import { ProfileComponent } from './component/profile/profile.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'about', component:HomeComponent},
  {path: 'appointment', component:AppointmentComponent},
  {path: 'department', component:HomeComponent},
  {path: 'doctor', component:HomeComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'contact', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
