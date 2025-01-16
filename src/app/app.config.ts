import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({ "projectId": "danotes-43cf6", "appId": "1:113100236371:web:50c220dd49dc501f0d08a6", "storageBucket": "danotes-43cf6.firebasestorage.app", "apiKey": "AIzaSyDHz0pKgL4AT_FF_0BqXpK_xOSkNJa_buI", "authDomain": "danotes-43cf6.firebaseapp.com", "messagingSenderId": "113100236371" })), provideFirestore(() => getFirestore())]
};
