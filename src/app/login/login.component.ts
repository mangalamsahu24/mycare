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


  constructor(private http: HttpClient) {}
  onSubmit() {
    const loginData = {
      username: this.username,
      password: this.password,
    };

    this.http.post('http://localhost:3000/login', loginData)
      .subscribe((response: any) => {
        if (response.success) {
          console.log('Login successful');
          // Navigate to another page on successful login if needed
        } else {
          console.log('Login failed: ', response.message);
          // Handle failed login
        }
      });
  }
}
