/**
 * @fileoverview Reusable Back Button Component
 * @description Standalone component for circular icon-only back navigation
 * @module shared/components/back-button
 */

import { Component, input, output } from '@angular/core';

/**
 * Circular icon-only back button component
 * @component BackButtonComponent
 */
@Component({
  selector: 'app-back-button',
  imports: [],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss',
})
export class BackButtonComponent {
  type = input<'submit' | 'button'>('button');
  disabled = input<boolean>(false);
  clicked = output<void>();

  /**
   * Handle button click
   * @function handleClick
   * @returns {void}
   */
  handleClick(): void {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }
}
