/**
 * @fileoverview Verify Email Component
 * @description Component for email verification after registration
 * @module features/auth/pages/verify-email
 */

import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthStore } from '@stores/auth';
import { PrimaryButtonComponent } from '@shared/components';

@Component({
  selector: 'app-verify-email',
  imports: [PrimaryButtonComponent],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authStore = inject(AuthStore);

  protected isVerifying = signal(true);
  protected verificationSuccess = signal(false);
  protected verificationError = signal(false);
  protected userEmail = signal('');

  /**
   * Initialize component and verify email
   * @function ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.verifyEmailFromUrl();
  }

  /**
   * Extract oobCode and verify email
   * @async
   * @function verifyEmailFromUrl
   * @returns {Promise<void>}
   */
  async verifyEmailFromUrl(): Promise<void> {
    const oobCode = this.getOobCode();

    if (!oobCode) {
      this.redirectToSignin();
      return;
    }

    await this.performVerification(oobCode);
  }

  /**
   * Get oobCode from URL
   * @function getOobCode
   * @returns {string | null} oobCode
   */
  getOobCode(): string | null {
    return this.route.snapshot.queryParamMap.get('oobCode');
  }

  /**
   * Perform email verification
   * @async
   * @function performVerification
   * @param {string} oobCode - Verification code
   * @returns {Promise<void>}
   */
  async performVerification(oobCode: string): Promise<void> {
    try {
      await this.authStore.verifyEmail(oobCode);
      this.verificationSuccess.set(true);
    } catch (error) {
      console.error('Email verification failed:', error);
      this.verificationError.set(true);
    } finally {
      this.isVerifying.set(false);
    }
  }

  /**
   * Navigate to signin page
   * @function navigateToSignin
   * @returns {void}
   */
  navigateToSignin(): void {
    this.router.navigate(['/auth/signin']);
  }

  /**
   * Redirect to signin page
   * @function redirectToSignin
   * @returns {void}
   */
  redirectToSignin(): void {
    this.router.navigate(['/auth/signin']);
  }
}
