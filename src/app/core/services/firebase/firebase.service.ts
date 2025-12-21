/**
 * @fileoverview Firebase Service for Firestore and Auth operations
 * @description This service provides core Firebase functionality for the DABubble application.
 * It manages Firestore database operations and Authentication.
 * @module FirebaseService
 */

import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Storage } from '@angular/fire/storage';
import { environment } from '../../../../config/environments/env.dev';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private storage = inject(Storage);

  constructor() {
    if (!environment.production) {
      console.log('🔥 Firebase Service initialized!');
      console.log('✅ Firestore:', this.firestore ? 'Connected' : 'Not Connected');
      console.log('✅ Auth:', this.auth ? 'Connected' : 'Not Connected');
      console.log('✅ Storage:', this.storage ? 'Connected' : 'Not Connected');
    }
  }

  // Weitere Firebase-Methoden werden hier hinzugefügt
  // z.B. getUser(), createChannel(), sendMessage(), etc.
}
