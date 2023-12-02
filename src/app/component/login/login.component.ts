import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  // login(): void {
  //   // Implement your login logic here
  //   console.log('Username:', this.username);
  //   console.log('Password:', this.password);
  // }
   constructor(private http: HttpClient) {}

  login(): void {
    this.http.post<any>('http://localhost:3000/api/login', { username: this.username, password: this.password })
      .subscribe(response => {
        if (response.success) {
          console.log('Login successful');
          // You can navigate to another page or perform other actions upon successful login
        } else {
          console.log('Login failed:', response.message);
        }
      });
  }
}
