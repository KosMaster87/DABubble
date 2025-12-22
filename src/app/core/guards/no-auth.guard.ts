/**
 * @fileoverview No Authentication Guard
 * @description Prevents authenticated users from accessing signin/signup pages
 * @module guards/no-auth
 */

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@stores/auth';

/**
 * Guard to prevent authenticated users from accessing auth pages
 * @function noAuthGuard
 * @returns {boolean | Promise<boolean>} True if user is not authenticated, otherwise redirects to dashboard
 */
export const noAuthGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const store = inject(AuthStore);

  return await checkNoAuthentication(store, router);
};

/**
 * Check if user is not authenticated (waits for auth state to load)
 * @async
 * @function checkNoAuthentication
 * @param {InstanceType<typeof AuthStore>} store - Auth store instance
 * @param {Router} router - Angular router instance
 * @returns {Promise<boolean>} True if not authenticated, false otherwise
 */
async function checkNoAuthentication(
  store: InstanceType<typeof AuthStore>,
  router: Router
): Promise<boolean> {
  while (store.isLoading()) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  const isAuthenticated = store.isAuthenticated();

  if (isAuthenticated) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
}
