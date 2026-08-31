/**
 * @fileoverview Settings Component
 * @description Settings page for user preferences like theme selection (Dashboard view)
 * @module SettingsComponent
 */

import { Component, inject, output, input } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeToggleComponent } from '@shared/components/theme-toggle';
import { LanguageSwitcherComponent } from '@shared/components/language-switcher';
import { AuthStore } from '@stores/auth';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ThemeToggleComponent, LanguageSwitcherComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  private router = inject(Router);
  private authStore = inject(AuthStore);

  isMobileView = input<boolean>(false); // Input from parent to know if mobile
  backRequested = output<void>(); // For mobile back navigation

  protected isAdmin = this.authStore.isAdmin;

  /**
   * Navigate to the admin panel.
   * @description Only rendered when isAdmin() is true; adminGuard is the real
   * enforcement point, this is just the UI entry.
   */
  goToAdminPanel(): void {
    this.router.navigate(['/dashboard/admin']);
  }

  /**
   * Navigate back to dashboard or sidebar (on mobile)
   * @description Keeps this component focused on UI orchestration while delegating domain logic to dedicated services and stores.
   */
  goBack() {
    if (this.isMobileView()) {
      // On mobile: emit event for parent to handle (back to sidebar)
      this.backRequested.emit();
    } else {
      // On desktop: navigate directly to dashboard
      this.router.navigate(['/dashboard']);
    }
  }
}
