/**
 * @fileoverview Authentication Login Methods
 * @description Methods for email, Google, and anonymous login
 * @module AuthLoginMethods
 */

import {
  Auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInAnonymously,
  GoogleAuthProvider,
  UserCredential,
} from '@angular/fire/auth';
import { patchState } from '@ngrx/signals';

/**
 * Create login methods for auth store
 * @function createLoginMethods
 * @param {Auth} auth - Firebase Auth instance
 * @param {any} store - NgRx Signal Store instance
 * @param {Function} handleSuccessfulAuth - Success handler
 * @param {Function} handleAuthError - Error handler
 * @returns {object} Login methods
 */
export const createLoginMethods = (
  auth: Auth,
  store: any,
  handleSuccessfulAuth: (user: any) => void,
  handleAuthError: (error: unknown, message: string) => void
) => ({
  /**
   * Login with email and password
   * @async
   * @param {string} email - User email address
   * @param {string} password - User password
   */
  async loginWithEmail(email: string, password: string): Promise<void> {
    await performLogin(
      () => signInWithEmailAndPassword(auth, email, password),
      store,
      handleSuccessfulAuth,
      handleAuthError
    );
  },

  /**
   * Login with Google OAuth provider
   * @async
   */
  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await performLogin(
      () => signInWithPopup(auth, provider),
      store,
      handleSuccessfulAuth,
      handleAuthError
    );
  },

  /**
   * Login anonymously as guest
   * @async
   */
  async loginAnonymously(): Promise<void> {
    await performLogin(() => signInAnonymously(auth), store, handleSuccessfulAuth, handleAuthError);
  },

  /**
   * Logout current user
   * @async
   */
  async logout(): Promise<void> {
    patchState(store, { isLoading: true });
    try {
      await auth.signOut();
      patchState(store, { user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      handleAuthError(error, 'Logout failed');
    }
  },
});

/**
 * Generic login handler for different authentication methods
 * @async
 * @function performLogin
 * @param {Function} loginFn - Function that returns UserCredential promise
 * @param {any} store - NgRx Signal Store instance
 * @param {Function} handleSuccessfulAuth - Success handler
 * @param {Function} handleAuthError - Error handler
 * @private
 */
async function performLogin(
  loginFn: () => Promise<UserCredential>,
  store: any,
  handleSuccessfulAuth: (user: any) => void,
  handleAuthError: (error: unknown, message: string) => void
): Promise<void> {
  patchState(store, { isLoading: true, error: null });
  try {
    const credential = await loginFn();
    handleSuccessfulAuth(credential.user);
  } catch (error) {
    handleAuthError(error, 'Login failed');
  }
}
