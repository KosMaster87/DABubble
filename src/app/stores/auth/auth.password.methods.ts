/**
 * @fileoverview Authentication Password Methods
 * @description Methods for password reset and recovery
 * @module AuthPasswordMethods
 */

import { Auth, sendPasswordResetEmail, confirmPasswordReset } from '@angular/fire/auth';

/**
 * Create password methods for auth store
 * @function createPasswordMethods
 * @param {Auth} auth - Firebase Auth instance
 * @returns {object} Password methods
 */
export const createPasswordMethods = (auth: Auth) => ({
  /**
   * Send password reset email
   * @async
   * @param {string} email - User email address
   */
  async sendPasswordResetEmail(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  },

  /**
   * Confirm password reset with code
   * @async
   * @param {string} code - Reset code from email
   * @param {string} newPassword - New password
   */
  async confirmPasswordReset(code: string, newPassword: string): Promise<void> {
    await confirmPasswordReset(auth, code, newPassword);
  },
});
