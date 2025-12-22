/**
 * @fileoverview Authentication Signup Methods
 * @description Methods for user registration and email verification
 * @module AuthSignupMethods
 */

import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
  applyActionCode,
} from '@angular/fire/auth';
import { patchState } from '@ngrx/signals';

/**
 * Create signup methods for auth store
 * @function createSignupMethods
 * @param {Auth} auth - Firebase Auth instance
 * @param {any} store - NgRx Signal Store instance
 * @param {Function} handleSuccessfulAuth - Success handler
 * @param {Function} handleAuthError - Error handler
 * @returns {object} Signup methods
 */
export const createSignupMethods = (
  auth: Auth,
  store: any,
  handleSuccessfulAuth: (user: any) => void,
  handleAuthError: (error: unknown, message: string) => void
) => ({
  /**
   * Signup new user with email and password
   * @async
   * @param {string} email - User email address
   * @param {string} password - User password
   * @param {string} displayName - User display name
   */
  async signup(email: string, password: string, displayName: string): Promise<void> {
    patchState(store, { isLoading: true, error: null });
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName });
      handleSuccessfulAuth(credential.user);
    } catch (error) {
      handleAuthError(error, 'Registration failed');
    }
  },

  /**
   * Verify email with code
   * @async
   * @param {string} code - Verification code from email
   */
  async verifyEmail(code: string): Promise<void> {
    await applyActionCode(auth, code);
  },

  /**
   * Update user profile
   * @async
   * @param {Object} profile - Profile data to update
   */
  async updateUserProfile(profile: { displayName?: string; photoURL?: string }): Promise<void> {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('No user logged in');
    await updateProfile(currentUser, profile);
  },
});
