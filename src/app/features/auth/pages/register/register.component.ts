/**
 * @fileoverview Registration Component
 * @description Component for user registration with form validation
 * @module pages/register
 */

import { Component, inject, signal } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStore } from '@stores/auth.store';
import { slideDownAnimation } from '@shared/animations';
import {
  InputFieldComponent,
  CheckboxFieldComponent,
  PrimaryButtonComponent,
  BackButtonComponent,
} from '@shared/components';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    InputFieldComponent,
    CheckboxFieldComponent,
    PrimaryButtonComponent,
    BackButtonComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  animations: [slideDownAnimation],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authStore = inject(AuthStore);
  private router = inject(Router);

  protected registerForm: FormGroup;
  protected isSubmitting = signal(false);

  constructor() {
    this.registerForm = this.createForm();
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
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    await this.performRegistration();
  }

  /**
   * Perform registration with AuthStore
   * @async
   * @function performRegistration
   * @returns {Promise<void>}
   */
  async performRegistration(): Promise<void> {
    this.isSubmitting.set(true);

    try {
      const { name, email, password } = this.registerForm.value;
      await this.authStore.register(email, password, name);
      await this.router.navigate(['/avatar-selection']);
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
    this.router.navigate(['/register']);
  }
}
