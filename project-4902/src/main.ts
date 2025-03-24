import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const firebaseConfig = {
  apiKey: "AIzaSyAn3B1UoeUJG3r5BX7vicSDb-PA9AOEzHo",
  authDomain: "research-finder-33c2b.firebaseapp.com",
  projectId: "research-finder-33c2b",
  storageBucket: "research-finder-33c2b.appspot.com",
  messagingSenderId: "223873501213",
  appId: "1:223873501213:web:549f64292f3e6c95aa9ef4",
  measurementId: "G-7WTRB4LCNJ"
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(FormsModule, MatDialogModule, MatSnackBarModule),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
}).catch(err => console.error(err));
