import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBk6HChAXHKvOYe0SMRVd1QaIyQS-r-EOg",
  authDomain: "prioritymatrix-d45cc.firebaseapp.com",
  projectId: "prioritymatrix-d45cc",
  storageBucket: "prioritymatrix-d45cc.firebasestorage.app",
  messagingSenderId: "632252963530",
  appId: "1:632252963530:web:32b5ec8b0a449479f77233",
  measurementId: "G-P05NXV0NGF"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth())
  ]
};
