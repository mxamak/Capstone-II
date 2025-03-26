/*import { inject, Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Observable, from } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth); // ✅ This worked before — keep it

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(response => {
      updateProfile(response.user, { displayName: username });
      localStorage.setItem('token', response.user.uid);
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
}
*/
import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth); // ✅ This worked before — keep it
  private firestore = inject(Firestore);

  register(email: string, username: string, password: string, userType: 'participant' | 'researcher'): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(async (response) => {
      const uid = response.user.uid;
      const userCollection = userType === 'participant' ? 'Participant Info' : 'Researcher Info';
      
      // Save user data in Firestore
      await setDoc(doc(collection(this.firestore, userCollection), uid), {
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
}
