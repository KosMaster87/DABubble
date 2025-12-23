/**
 * @fileoverview Avatar Selection Guard
 * @description Only allows access to avatar selection if user is authenticated and email is verified
 * @module guards/avatar-selection
 */

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

/**
 * Guard to protect avatar selection page
 * Requires authentication AND email verification
 * @function avatarSelectionGuard
 * @returns {boolean | Promise<boolean>} True if user can access, otherwise redirects
 */
export const avatarSelectionGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const auth = inject(Auth);

  return await checkAvatarSelectionAccess(auth, router);
};

/**
 * Check if user can access avatar selection
 * @async
 * @function checkAvatarSelectionAccess
 * @param {Auth} auth - Firebase Auth instance
 * @param {Router} router - Angular router instance
 * @returns {Promise<boolean>} True if can access, false otherwise
 */
async function checkAvatarSelectionAccess(auth: Auth, router: Router): Promise<boolean> {
  const user = auth.currentUser;

  if (!user) {
    router.navigate(['/auth/signin']);
    return false;
  }

  await user.reload();

  if (!user.emailVerified) {
    router.navigate(['/auth/verify-email']);
    return false;
  }

  if (user.photoURL) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
}
