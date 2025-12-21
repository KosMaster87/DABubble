/**
 * @fileoverview Authentication Store for DABubble Application
 * @description NgRx SignalStore for managing authentication state with Firebase Auth integration
 * @module AuthStore
 */

import { computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import {
  Auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  UserCredential,
  User as FirebaseUser,
} from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '@core/models/user.model';

/**
 * Authentication state interface
 * @interface AuthState
 */
export interface AuthState {
  /** Current authenticated user */
  user: User | null;
  /** Authentication status flag */
  isAuthenticated: boolean;
  /** Loading state indicator */
  isLoading: boolean;
  /** Error message if any */
  error: string | null;
}

/**
 * Initial authentication state
 * @constant {AuthState}
 */
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

/**
 * Authentication store with Firebase integration
 * Provides methods for login, logout, registration and state management
 * @constant {SignalStore}
 */
export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    /**
     * Computed property to check if user is fully logged in
     * @returns {Signal<boolean>} True if user is authenticated and user object exists
     */
    isLoggedIn: computed(() => store.isAuthenticated() && store.user() !== null),

    /**
     * Computed property for user display name with fallback
     * @returns {Signal<string>} User display name or 'Anonymous'
     */
    userDisplayName: computed(() => store.user()?.displayName || 'Anonymous'),

    /**
     * Computed property for user email
     * @returns {Signal<string>} User email or empty string
     */
    userEmail: computed(() => store.user()?.email || ''),

    /**
     * Computed property to check if there's an error
     * @returns {Signal<boolean>} True if error exists
     */
    hasError: computed(() => store.error() !== null),
  })),
  withMethods((store) => {
    const auth = inject(Auth);

    return {
      /**
       * Login with email and password
       * @async
       * @function loginWithEmail
       * @param {string} email - User email address
       * @param {string} password - User password
       * @returns {Promise<void>}
       */
      async loginWithEmail(email: string, password: string) {
        await this.performLogin(() => signInWithEmailAndPassword(auth, email, password));
      },

      /**
       * Login with Google OAuth provider
       * @async
       * @function loginWithGoogle
       * @returns {Promise<void>}
       */
      async loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        await this.performLogin(() => signInWithPopup(auth, provider));
      },

      /**
       * Logout current user
       * @async
       * @function logout
       * @returns {Promise<void>}
       */
      async logout() {
        await this.performLogout();
      },

      /**
       * Register new user with email and password
       * @async
       * @function register
       * @param {string} email - User email address
       * @param {string} password - User password
       * @param {string} displayName - User display name
       * @returns {Promise<void>}
       */
      async register(email: string, password: string, displayName: string) {
        await this.performRegistration(email, password, displayName);
      },

      /**
       * Generic login handler for different authentication methods
       * @async
       * @function performLogin
       * @param {Function} loginFn - Function that returns UserCredential promise
       * @returns {Promise<void>}
       * @private
       */
      async performLogin(loginFn: () => Promise<UserCredential>) {
        patchState(store, { isLoading: true, error: null });
        try {
          const credential = await loginFn();
          await this.handleSuccessfulAuth(credential.user);
        } catch (error) {
          this.handleAuthError(error, 'Login failed');
        }
      },

      /**
       * Handle user logout process
       * @async
       * @function performLogout
       * @returns {Promise<void>}
       * @private
       */
      async performLogout() {
        patchState(store, { isLoading: true });
        try {
          await signOut(auth);
          patchState(store, { user: null, isAuthenticated: false, isLoading: false });
        } catch (error) {
          this.handleAuthError(error, 'Logout failed');
        }
      },

      /**
       * Handle user registration process
       * @async
       * @function performRegistration
       * @param {string} email - User email address
       * @param {string} password - User password
       * @param {string} displayName - User display name
       * @returns {Promise<void>}
       * @private
       */
      async performRegistration(email: string, password: string, displayName: string) {
        patchState(store, { isLoading: true, error: null });
        try {
          const credential = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(credential.user, { displayName });
          await this.handleSuccessfulAuth(credential.user);
        } catch (error) {
          this.handleAuthError(error, 'Registration failed');
        }
      },

      /**
       * Handle successful authentication response
       * @async
       * @function handleSuccessfulAuth
       * @param {FirebaseUser} firebaseUser - Firebase user object
       * @returns {Promise<void>}
       * @private
       */
      async handleSuccessfulAuth(firebaseUser: FirebaseUser) {
        const user: User = this.mapFirebaseUser(firebaseUser);
        patchState(store, {
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      },

      /**
       * Handle authentication errors
       * @function handleAuthError
       * @param {unknown} error - Error object
       * @param {string} defaultMessage - Default error message
       * @private
       */
      handleAuthError(error: unknown, defaultMessage: string) {
        const errorMessage = error instanceof Error ? error.message : defaultMessage;
        patchState(store, { error: errorMessage, isLoading: false });
      },

      /**
       * Map Firebase user to application user model
       * @function mapFirebaseUser
       * @param {FirebaseUser} firebaseUser - Firebase user object
       * @returns {User} Application user object
       * @private
       */
      mapFirebaseUser(firebaseUser: FirebaseUser): User {
        return {
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
        };
      },

      /**
       * Set loading state
       * @function setLoading
       * @param {boolean} isLoading - Loading state
       */
      setLoading(isLoading: boolean) {
        patchState(store, { isLoading });
      },

      /**
       * Set error message
       * @function setError
       * @param {string|null} error - Error message or null to clear
       */
      setError(error: string | null) {
        patchState(store, { error });
      },

      /**
       * Set authenticated user
       * @function setUser
       * @param {User|null} user - User object or null
       */
      setUser(user: User | null) {
        patchState(store, {
          user,
          isAuthenticated: user !== null,
          error: null,
        });
      },

      /**
       * Clear error message
       * @function clearError
       */
      clearError() {
        patchState(store, { error: null });
      },
    };
  })
);
