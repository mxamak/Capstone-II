import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth); // ✅ Firebase Authentication
  private firestore = inject(Firestore); // ✅ Firestore Database

  register(email: string, username: string, password: string, userType: 'participant' | 'researcher'): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(async (response) => {
      const uid = response.user.uid;

      // ✅ Update user profile to set displayName
      await updateProfile(response.user, { displayName: username });

      // ✅ Store user info in Firestore "users" collection
      const userDocRef = doc(this.firestore, 'users', uid);
      await setDoc(userDocRef, {
        uid,
        email,
        username,
        userType
      });

      // ✅ Store user info in the correct subcollection ("Participant Info" or "Researcher Info")
      const userCollection = userType === 'participant' ? 'Participant Info' : 'Researcher Info';
      await setDoc(doc(collection(this.firestore, userCollection), uid), {
        uid,
        email,
        username,
        userType
      });

      localStorage.setItem('token', uid);
    });

    return from(promise);
  }

  login(email: string, password: string): Observable<any> {
    return from(
      signInWithEmailAndPassword(this.firebaseAuth, email, password).then(response => {
        localStorage.setItem('token', response.user.uid);
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Add a method to get the current user ID
  getUserId(): string {
    return localStorage.getItem('token') || '';
  }
}