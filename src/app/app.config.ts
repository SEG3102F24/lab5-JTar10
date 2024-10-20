import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { environment } from '../environments/environment.development';
import { initializeApp } from '@angular/fire/app';
import { provideFirebaseApp } from '@angular/fire/app';

import { getFirestore } from '@angular/fire/firestore';
import { provideFirestore } from '@angular/fire/firestore';
import { getAuth } from '@angular/fire/auth';
import { provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
  ],
};
