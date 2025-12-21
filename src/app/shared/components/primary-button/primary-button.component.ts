/**
 * @fileoverview Reusable Primary Button Component
 * @description Standalone component for primary action buttons with loading state
 * @module shared/components/primary-button
 */

import { Component, input, output } from '@angular/core';

/**
 * Primary button component with loading spinner
 * @component PrimaryButtonComponent
 */
@Component({
  selector: 'app-primary-button',
  imports: [],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.scss',
})
export class PrimaryButtonComponent {
  label = input<string>('Continue');
  type = input<'submit' | 'button'>('button');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  clicked = output<void>();

  /**
   * Handle button click
   * @function handleClick
   * @returns {void}
   */
  handleClick(): void {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit();
    }
  }
}
