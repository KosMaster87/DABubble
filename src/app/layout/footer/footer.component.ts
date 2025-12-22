/**
 * @fileoverview Footer Component
 * @description Footer with popup-signup and legal-information components
 * @module FooterComponent
 */

import { Component } from '@angular/core';
import { PopupSignupComponent } from '@features/auth/components/popup-signup/popup-signup.component';
import { LegalInformationComponent } from '@shared/components/legal-information/legal-information.component';

/**
 * Footer Component
 * @class FooterComponent
 * @description Standalone component that displays popup-signup (mobile) and legal information
 */
@Component({
  selector: 'app-footer',
  imports: [PopupSignupComponent, LegalInformationComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
