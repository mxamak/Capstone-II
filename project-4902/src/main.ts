import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const firebaseConfig = {
  apiKey: "AIzaSyAn3B1UoeUJG3r5BX7vicSDb-PA9AOEzHo",
  authDomain: "research-finder-33c2b.firebaseapp.com",
  projectId: "research-finder-33c2b",
  storageBucket: "research-finder-33c2b.firebasestorage.com",  
  messagingSenderId: "223873501213",
  appId: "1:223873501213:web:549f64292f3e6c95aa9ef4",
  measurementId: "G-7WTRB4LCNJ"
};

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    importProvidersFrom(FormsModule, MatDialogModule, MatSnackBarModule), 
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ]
}).catch((err) => console.error(err));
