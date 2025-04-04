import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth'; // Firebase Auth service
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore'; // Firestore functions
import { inject } from '@angular/core';
import { User } from 'firebase/auth'; // Firebase User type
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  user: User | null = null; // Firebase user
  description: string = ''; // Description editable by the user

  private auth = inject(Auth); // Inject Firebase Auth service
  private firestore = inject(Firestore); // Inject Firestore service

  ngOnInit(): void {
    // Fetch user data when the component is initialized
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user; // Set the logged-in user
        this.fetchDescription(user.uid); // Fetch the description from Firestore
      }
    });
  }

  // Get the user initials (same logic as before)
  getInitials(displayName: string | null | undefined, email: string | null | undefined): string {
    if (!displayName && !email) {
      return '?'; // Default to '?' if both displayName and email are null/undefined
    }

    const name = displayName || email || '';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  }

  // Fetch the description from Firestore
  async fetchDescription(userId: string): Promise<void> {
    try {
      const userDocRef = doc(this.firestore, 'users', userId); // Firestore document reference
      const userDoc = await getDoc(userDocRef); // Get the user document

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData?.['description']) {  // Use bracket notation to access description
          this.description = userData['description']; // Set the description from Firestore
        }
      }
    } catch (error) {
      console.error('Error fetching user description:', error);
    }
  }

  // Save or update the description in Firestore
  async saveDescription(): Promise<void> {
    if (this.user) {
      try {
        const userDocRef = doc(this.firestore, 'users', this.user.uid); // Reference to Firestore document

        // Save the description to Firestore
        await setDoc(userDocRef, { description: this.description }, { merge: true });

        console.log('Description saved successfully!');
      } catch (error) {
        console.error('Error saving description:', error);
      }
    }
  }
}
