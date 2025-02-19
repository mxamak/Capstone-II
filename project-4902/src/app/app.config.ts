import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { initializeApp } from "firebase/app";
import { initializeApp as initializeApp_alias, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { getVertexAI, provideVertexAI } from '@angular/fire/vertexai';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()), 
    provideFirebaseApp(() => 
      initializeApp({ 
        projectId: "project-4902", 
        appId: "1:633009467002:web:462f2f64732962424515c3", 
        storageBucket: "project-4902.firebasestorage.app", 
        apiKey: "AIzaSyCYxON2Ji2QFoiK0TUBXEMvDzQCegziy9E", 
        authDomain: "project-4902.firebaseapp.com", 
        messagingSenderId: "633009467002" })
      ), 
      provideAuth(() => getAuth()), 
      provideAnalytics(() => getAnalytics()), 
      ScreenTrackingService, UserTrackingService, 
      
  provideAppCheck(() => {
  // TODO get a reCAPTCHA Enterprise here https://console.cloud.google.com/security/recaptcha?project=_
  const provider = new ReCaptchaEnterpriseProvider("6LdrrtUqAAAAADzHatjGi3NZGvnkoa05PBxWXCgg");
  return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
} 
), 
provideFirestore(() => getFirestore()), 
provideDatabase(() => getDatabase()), 
provideFunctions(() => getFunctions()), 
provideMessaging(() => getMessaging()), 
providePerformance(() => getPerformance()), 
provideStorage(() => getStorage()), 
provideRemoteConfig(() => getRemoteConfig()), 
provideVertexAI(() => getVertexAI())]
};

const firebaseConfig = {
  apiKey: "AIzaSyCYxON2Ji2QFoiK0TUBXEMvDzQCegziy9E",
  authDomain: "project-4902.firebaseapp.com",
  projectId: "project-4902",
  storageBucket: "project-4902.firebasestorage.app",
  messagingSenderId: "633009467002",
  appId: "1:633009467002:web:462f2f64732962424515c3"
};

const app = initializeApp(firebaseConfig);


