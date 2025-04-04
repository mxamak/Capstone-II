import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-others-profile',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './view-others-profile.component.html',
  styleUrls: ['./view-others-profile.component.css']
})
export class ViewOthersProfileComponent implements OnInit {
  userId: string | null = null;
  userData: { username?: string; email?: string; description?: string } = {};

  private firestore = inject(Firestore);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId'); // Get user ID from route
    if (this.userId) {
      this.fetchUserProfile(this.userId);
    }
  }

  // Fetch user details from Firestore "users" collection
  async fetchUserProfile(userId: string): Promise<void> {
    try {
      console.log("Fetching user profile for ID:", userId); // Debug Log
  
      const userDocRef = doc(this.firestore, 'users', userId); // Get reference to Firestore document
      const userDoc = await getDoc(userDocRef); // Fetch document
  
      if (userDoc.exists()) {
        this.userData = userDoc.data() as { username?: string; email?: string; description?: string };
  
        console.log("User profile data fetched:", this.userData); // Debug Log
      } else {
        console.error('User profile not found in Firestore');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }

  // Generate initials from username or email
  getInitials(username: string | undefined, email: string | undefined): string {
    if (username) {
      return username.split(' ').map((name) => name[0]).join('').toUpperCase();
    }
    return email ? email[0].toUpperCase() : '?';
  }
}
