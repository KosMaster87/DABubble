/**
 * @fileoverview Dashboard Component
 * @description Main dashboard view after authentication
 * @module features/dashboard/pages/main
 */

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '@stores/auth';
import { SecondaryButtonComponent } from '@shared/components';

@Component({
  selector: 'app-dashboard',
  imports: [SecondaryButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private router = inject(Router);
  protected authStore = inject(AuthStore);

  /**
   * Get current user
   * @function currentUser
   * @returns {User | null} Current user
   */
  get currentUser() {
    return this.authStore.user();
  }

  /**
   * Logout user
   * @async
   * @function logout
   * @returns {Promise<void>}
   */
  async logout(): Promise<void> {
    await this.authStore.logout();
    await this.router.navigate(['/auth/signin']);
  }
}
