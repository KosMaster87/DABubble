/**
 * @fileoverview Authentication Helper Functions
 * @description Utility functions for authentication state management
 * @module AuthHelpers
 */

import { User as FirebaseUser } from '@angular/fire/auth';
import { User } from '@core/models/user.model';
import { patchState } from '@ngrx/signals';
import type { AuthState } from './auth.types';

/**
 * Convert Firebase user to app User model
 * @function mapFirebaseUserToUser
 * @param {FirebaseUser} firebaseUser - Firebase user object
 * @returns {User} App user object
 */
export const mapFirebaseUserToUser = (firebaseUser: FirebaseUser): User => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email || '',
  displayName: firebaseUser.displayName || '',
  photoURL: firebaseUser.photoURL || undefined,
  isOnline: true,
  lastSeen: new Date(),
  channels: [],
  directMessages: [],
  createdAt: new Date(),
  updatedAt: new Date(),
});

/**
 * Handle user authenticated state
 * @function createAuthStateHandlers
 * @param {any} store - NgRx Signal Store instance
 * @returns {object} Handler functions
 */
export const createAuthStateHandlers = (store: any) => ({
  /**
   * Handle user authenticated state
   * @param {FirebaseUser} firebaseUser - Firebase user object
   */
  handleUserAuthenticated: (firebaseUser: FirebaseUser): void => {
    const user = mapFirebaseUserToUser(firebaseUser);
    patchState(store, { user, isAuthenticated: true, isLoading: false });
  },

  /**
   * Handle user logged out state
   */
  handleUserLoggedOut: (): void => {
    patchState(store, { user: null, isAuthenticated: false, isLoading: false });
  },

  /**
   * Handle successful authentication response
   * @param {FirebaseUser} firebaseUser - Firebase user object
   */
  handleSuccessfulAuth: (firebaseUser: FirebaseUser): void => {
    const user = mapFirebaseUserToUser(firebaseUser);
    patchState(store, {
      user,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  },

  /**
   * Handle authentication errors
   * @param {unknown} error - Error object
   * @param {string} defaultMessage - Default error message
   */
  handleAuthError: (error: unknown, defaultMessage: string): void => {
    const errorMessage = error instanceof Error ? error.message : defaultMessage;
    patchState(store, { error: errorMessage, isLoading: false });
  },
});
