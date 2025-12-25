/**
 * @fileoverview Dashboard Header Component
 * @description Header for dashboard with logo, search and profile
 * @module features/dashboard/components/dashboard-header
 */

import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '@stores/auth';
import { DABubbleLogoComponent } from '@shared/components/dabubble-logo/dabubble-logo.component';
import { UserOptionsMenuComponent } from '@shared/dashboard-components';

@Component({
  selector: 'app-dashboard-header',
  imports: [DABubbleLogoComponent, UserOptionsMenuComponent],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss',
})
export class DashboardHeaderComponent {
  private router = inject(Router);
  protected authStore = inject(AuthStore);
  protected isOptionsOpen = signal(false);

  /**
   * Get current user
   * @returns {User | null} Current user
   */
  get currentUser() {
    return this.authStore.user();
  }

  /**
   * Handle search input
   * @param {Event} event - Input event
   */
  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    console.log('Search query:', query);
    // TODO: Implement search functionality
  }

  /**
   * Toggle profile options menu
   */
  toggleOptions(): void {
    this.isOptionsOpen.update((value) => !value);
  }

  /**
   * Handle profile click
   */
  onProfileClick(): void {
    this.isOptionsOpen.set(false);
    console.log('Navigate to profile');
    // TODO: Navigate to profile page
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    this.isOptionsOpen.set(false);
    await this.authStore.logout();
    await this.router.navigate(['/']);
  }
}
