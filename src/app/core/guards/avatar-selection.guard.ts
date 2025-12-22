/**
 * @fileoverview Avatar Selection Guard
 * @description Only allows access to avatar selection if user has no avatar yet
 * @module guards/avatar-selection
 */

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@stores/auth';

/**
 * Guard to protect avatar selection page
 * Only allows access if user is authenticated but has no avatar
 * @function avatarSelectionGuard
 * @returns {boolean | Promise<boolean>} True if user can access, otherwise redirects
 */
export const avatarSelectionGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const store = inject(AuthStore);

  return await checkAvatarSelectionAccess(store, router);
};

/**
 * Check if user can access avatar selection
 * @async
 * @function checkAvatarSelectionAccess
 * @param {InstanceType<typeof AuthStore>} store - Auth store instance
 * @param {Router} router - Angular router instance
 * @returns {Promise<boolean>} True if can access, false otherwise
 */
async function checkAvatarSelectionAccess(
  store: InstanceType<typeof AuthStore>,
  router: Router
): Promise<boolean> {
  while (store.isLoading()) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  const isAuthenticated = store.isAuthenticated();
  const user = store.user();

  if (!isAuthenticated || !user) {
    router.navigate(['/auth/signin']);
    return false;
  }

  if (user.photoURL) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
}
