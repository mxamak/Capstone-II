import { Component, OnInit, ElementRef, HostListener  } from '@angular/core';
import { Auth } from '@angular/fire/auth'; // Firebase Auth service
import { inject } from '@angular/core'; // For injecting the Auth service
import { User } from 'firebase/auth'; // Firebase User type
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null; // To hold the current user
  dropdownVisible = false; // To toggle dropdown visibility

  private auth = inject(Auth); // Inject Firebase Auth service

  constructor(private router: Router, private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Listen for auth state changes and set the user
    this.auth.onAuthStateChanged((user) => {
      this.user = user; // Set the user on login or when the page loads
    });
  }

  // Toggle the dropdown menu visibility
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.dropdownVisible = false;
    }
  }

  // Get user initials from displayName or email
  getInitials(displayName: string | null | undefined, email: string | null | undefined): string {
    // If displayName is available, use it. Otherwise, fall back to email.
    if (displayName && displayName !== 'undefined') {
      return displayName.split(' ').map((name) => name[0]).join('').toUpperCase();
    }
  
    // If displayName is undefined, use the email
    return email ? email[0].toUpperCase() : '?';
  }

  // Optionally add a logout method if you need it
  async logout(): Promise<void> {
    try {
      await this.auth.signOut(); // Log the user out
      localStorage.removeItem('token');
      this.router.navigate(['/']);
      console.log('User logged out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
}
