/**
 * @fileoverview Authentication Store Types
 * @description Type definitions and initial state for authentication
 * @module AuthStoreTypes
 */

import { User } from '@core/models/user.model';

/**
 * Authentication state interface
 * @interface AuthState
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Initial authentication state
 * @constant {AuthState}
 */
export const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};
