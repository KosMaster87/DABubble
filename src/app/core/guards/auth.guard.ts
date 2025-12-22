/**
 * @fileoverview Authentication Guard
 * @description Protects routes from unauthenticated access
 * @module guards/auth
 */

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@stores/auth';

/**
 * Guard to protect routes that require authentication
 * @function authGuard
 * @returns {boolean | Promise<boolean>} True if user is authenticated, otherwise redirects to signin
 */
export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const store = inject(AuthStore);

  return await checkAuthentication(store, router);
};

/**
 * Check if user is authenticated (waits for auth state to load)
 * @async
 * @function checkAuthentication
 * @param {InstanceType<typeof AuthStore>} store - Auth store instance
 * @param {Router} router - Angular router instance
 * @returns {Promise<boolean>} True if authenticated, false otherwise
 */
async function checkAuthentication(
  store: InstanceType<typeof AuthStore>,
  router: Router
): Promise<boolean> {
  while (store.isLoading()) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  const isAuthenticated = store.isAuthenticated();

  if (!isAuthenticated) {
    router.navigate(['/auth/signin']);
    return false;
  }

  return true;
}
