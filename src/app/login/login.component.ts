import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData = {
      username: this.username,
      password: this.password,
    };

    this.http.post('http://localhost:3000/login', loginData)
      .subscribe((response: any) => {
        if (response.success) {
          console.log('Login successful:', response.message);
          // Redirect to the home page upon successful login
          this.router.navigate(['admin']);
        } else {
          console.log('Login failed:', response.message);
          alert('Invalid login credentials. Please try again.');
          // Handle failed login, e.g., show an error message to the user
        }
      }, (error) => {
        console.error('Error during login:', error);
        // Handle other errors, e.g., show an error message to the user
      });
  }
}
