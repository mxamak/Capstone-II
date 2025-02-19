import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [RouterLink, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})


export class RegistrationComponent implements AfterViewInit {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  ngAfterViewInit() {
    // Initialize reCAPTCHA when the component loads
    this.authService.setupRecaptcha('recaptcha-container');
  }

  register() {
    this.authService.register(this.email, this.password)
      .then(res => console.log('User registered:', res))
      .catch(err => console.error('Error:', err));
  }
}
