/**
 * @fileoverview No Authentication Guard
 * @description Prevents authenticated users from accessing login/register pages
 * @module guards/no-auth
 */

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@stores/auth.store';

/**
 * Guard to prevent authenticated users from accessing auth pages
 * @function noAuthGuard
 * @returns {boolean} True if user is not authenticated, otherwise redirects to chat
 */
export const noAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(AuthStore);

  return checkNoAuthentication(store, router);
};

/**
 * Check if user is not authenticated
 * @function checkNoAuthentication
 * @param {InstanceType<typeof AuthStore>} store - Auth store instance
 * @param {Router} router - Angular router instance
 * @returns {boolean} True if not authenticated, false otherwise
 */
function checkNoAuthentication(store: InstanceType<typeof AuthStore>, router: Router): boolean {
  const isAuthenticated = store.isAuthenticated();

  if (isAuthenticated) {
    router.navigate(['/chat']);
    return false;
  }

  return true;
}
