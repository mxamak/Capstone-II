import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, initializeAuth, browserLocalPersistence, getAuth, RecaptchaVerifier } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private recaptchaVerifier!: RecaptchaVerifier;

  constructor(private auth: Auth) {
    initializeAuth(auth.app, {
      persistence: browserLocalPersistence
    });
  }

  setupRecaptcha(containerId: string) {
    this.recaptchaVerifier = new RecaptchaVerifier(this.auth, containerId, {
      size: 'normal',
      callback: (response: any) => {
        console.log('reCAPTCHA solved:', response);
      }
    });
    this.recaptchaVerifier.render();
  }

  // User Registration
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // User Login
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // User Logout
  logout() {
    return signOut(this.auth);
  }
}
