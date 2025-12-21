/**
 * @fileoverview Authentication Guard
 * @description Protects routes from unauthenticated access
 * @module guards/auth
 */

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@stores/auth.store';

/**
 * Guard to protect routes that require authentication
 * @function authGuard
 * @returns {boolean} True if user is authenticated, otherwise redirects to login
 */
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(AuthStore);

  return checkAuthentication(store, router);
};

/**
 * Check if user is authenticated
 * @function checkAuthentication
 * @param {InstanceType<typeof AuthStore>} store - Auth store instance
 * @param {Router} router - Angular router instance
 * @returns {boolean} True if authenticated, false otherwise
 */
function checkAuthentication(store: InstanceType<typeof AuthStore>, router: Router): boolean {
  const isAuthenticated = store.isAuthenticated();

  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  return true;
}
