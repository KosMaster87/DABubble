/**
 * @fileoverview Popup Signup Component
 * @description Displays signup call-to-action for users without an account
 * @module PopupSignupComponent
 */

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup-signup',
  imports: [],
  templateUrl: './popup-signup.component.html',
  styleUrl: './popup-signup.component.scss',
})
export class PopupSignupComponent {
  private readonly router = inject(Router);

  /**
   * Navigate to the signup page
   * @function navigateToSignup
   * @returns {void}
   */
  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
