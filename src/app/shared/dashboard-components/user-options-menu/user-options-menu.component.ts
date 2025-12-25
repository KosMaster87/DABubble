/**
 * @fileoverview User Options Menu Component
 * @description Dropdown menu with user options (Profile, Logout)
 * @module shared/dashboard-components/user-options-menu
 */

import { Component, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-options-menu',
  imports: [CommonModule],
  templateUrl: './user-options-menu.component.html',
  styleUrl: './user-options-menu.component.scss',
})
export class UserOptionsMenuComponent {
  isVisible = input.required<boolean>();
  profileClicked = output<void>();
  logoutClicked = output<void>();

  /**
   * Handle profile click
   */
  onProfileClick(): void {
    this.profileClicked.emit();
  }

  /**
   * Handle logout click
   */
  onLogoutClick(): void {
    this.logoutClicked.emit();
  }
}
