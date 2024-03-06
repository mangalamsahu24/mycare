import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'appointment', component:AppointmentComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'admin', component:AdminComponent},
  {path: 'login', component:LoginComponent},
  // {path: 'login', children: [
  //   {path: 'register', component:LoginComponent}
  // ]},
  {path: 'register', component:RegisterComponent},
  {path: 'register', children: [
    {path: 'login', component:LoginComponent}
  ]},

  // {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'uploads/**', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
