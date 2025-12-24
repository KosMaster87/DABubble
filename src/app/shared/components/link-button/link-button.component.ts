/**
 * @fileoverview Link Button Component
 * @description Reusable button styled as a link with router navigation
 * @module shared/components/link-button
 */

import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-link-button',
  imports: [RouterLink],
  templateUrl: './link-button.component.html',
  styleUrl: './link-button.component.scss',
})
export class LinkButtonComponent {
  label = input.required<string>();
  routerLink = input.required<string>();
}
