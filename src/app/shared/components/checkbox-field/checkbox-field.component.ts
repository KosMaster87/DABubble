/**
 * @fileoverview Reusable Checkbox Field Component
 * @description Standalone component for custom checkbox with label
 * @module shared/components/checkbox-field
 */

import { Component, input } from '@angular/core';

import { FormControl, ReactiveFormsModule } from '@angular/forms';

/**
 * Reusable checkbox field component with custom styling
 * @component CheckboxFieldComponent
 */
@Component({
  selector: 'app-checkbox-field',
  imports: [ReactiveFormsModule],
  templateUrl: './checkbox-field.component.html',
  styleUrl: './checkbox-field.component.scss',
})
export class CheckboxFieldComponent {
  control = input.required<FormControl>();
  id = input.required<string>();
  label = input<string>('');
}
