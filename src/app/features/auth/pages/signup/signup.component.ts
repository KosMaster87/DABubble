/**
 * @fileoverview Signup Component
 * @description Component for user registration with form validation
 * @module pages/signup
 */

import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStore } from '@stores/auth';
import { slideDownAnimation } from '@shared/animations';
import {
  InputFieldComponent,
  CheckboxFieldComponent,
  PrimaryButtonComponent,
  BackButtonComponent,
} from '@shared/components';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    InputFieldComponent,
    CheckboxFieldComponent,
    PrimaryButtonComponent,
    BackButtonComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  animations: [slideDownAnimation],
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private authStore = inject(AuthStore);
  private router = inject(Router);

  protected signupForm: FormGroup;
  protected isSubmitting = signal(false);

  constructor() {
    this.signupForm = this.createForm();
  }

  /**
   * Create registration form with validation
   * @function createForm
   * @returns {FormGroup} Form group with validators
   */
  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      privacy: [false, [Validators.requiredTrue]],
    });
  }

  /**
   * Handle form submission
   * @async
   * @function onSubmit
   * @returns {Promise<void>}
   */
  async onSubmit(): Promise<void> {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    await this.performRegistration();
  }

  /**
   * Perform registration with AuthStore
   * Routes to verify-email page after successful signup
   * @async
   * @function performRegistration
   * @returns {Promise<void>}
   */
  async performRegistration(): Promise<void> {
    this.isSubmitting.set(true);

    try {
      const { name, email, password } = this.signupForm.value;
      await this.authStore.signup(email, password, name);
      await this.router.navigate(['/verify-email']);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  /**
   * Navigate back to login page
   * @function goBack
   * @returns {void}
   */
  goBack(): void {
    this.router.navigate(['/']);
  }
}
