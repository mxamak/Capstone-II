import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';





@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ✅ Ensure ReactiveFormsModule is imported
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      userType: ['participant', Validators.required] // Default to participant
    });
  }

  goToHowItWorks() {
    this.router.navigate(['/how-it-works']);
  }

  registerUser() {
    if (this.registrationForm.invalid) {
      return;
    }

    const { email, username, password, confirmPassword, userType } = this.registrationForm.value;

    if (password !== confirmPassword) {
      console.error('Passwords do not match!');
      return;
    }

    this.authService.register(email, username, password, userType).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error(err.message)
    });
  }
}
