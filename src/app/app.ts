/**
 * @fileoverview Root component for the DABubble application.
 * @description This component serves as the main entry point for the application,
 * incorporating routing and global styles.
 * @module AppComponent
 */

import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from '@core/services/firebase/firebase.service';
import { environment } from '../config/environments/env.dev';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('dabubble');
  private firebaseService = inject(FirebaseService);

  constructor() {
    if (!environment.production) {
      console.log('🚀 DABubble App started!');
    }
  }
}
