import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private http: HttpClient, private router: Router) {}
  onSubmit() {
    if (this.password !== this.confirmPassword) {
      console.log('Passwords do not match');
      alert('passwords do not match');
      return;
    }
  // Validate that name, email, and password are not empty
  if (!this.name || !this.email || !this.password || !this.confirmPassword) {
    alert('Please fill in all fields.');
    return;
  }

  // Validate email format using a simple regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.email)) {
    alert('Please enter a valid email address.');
    return;
  }
    const registerData = {
      name: this.name,
      email: this.email,
      password: this.password,
    };
  
    this.http.post('http://localhost:3000/register', registerData)
      .subscribe(
        (response: any) => {
          if (response.success) {
            console.log('Registration successful:', response.message);
            alert('Registeration successful');
            this.router.navigate(['login']);
            // Redirect to login page or perform any other actions
          } else {
            console.log('Registration failed:', response.message);
  
            if (response.message === 'Email already registered') {
              alert('Email is already registered. Please use a different email address.');
            } else {
              // Handle other registration failures
              // alert('Registration failed');
            }
          }
        },
        (error) => {
          console.error('Error during registration:', error);
  
          if (error.status === 400 && error.error.message === 'Email already registered') {
            alert('Email is already registered. Please use a different email address.');
          } else {
            // Handle other errors, e.g., show an error message to the user
          }
        }
      );
  }
}  