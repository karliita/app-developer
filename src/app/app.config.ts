import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideIonicAngular({}), provideFirebaseApp(() => initializeApp({"projectId":"app-developer-961e7","appId":"1:912999440009:web:561031bf7d338fbc3d3058","storageBucket":"app-developer-961e7.firebasestorage.app","apiKey":"AIzaSyCe8tpZ1inyQHJrFkn9lxivTgyQXlHpnEg","authDomain":"app-developer-961e7.firebaseapp.com","messagingSenderId":"912999440009","measurementId":"G-ZLNTH5HDF1"})), provideFirestore(() => getFirestore()),
  ],
};
