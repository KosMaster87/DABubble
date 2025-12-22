/**
 * @fileoverview Header Component
 * @description Header with DABubble logo and popup-signup components
 * @module HeaderComponent
 */

import { Component } from '@angular/core';
import { DABubbleLogoComponent } from '@shared/components/dabubble-logo/dabubble-logo.component';
import { PopupSignupComponent } from '@features/auth/components/popup-signup/popup-signup.component';

/**
 * Header Component
 * @class HeaderComponent
 * @description Standalone component that displays logo and popup-signup (desktop)
 */
@Component({
  selector: 'app-header',
  imports: [DABubbleLogoComponent, PopupSignupComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
