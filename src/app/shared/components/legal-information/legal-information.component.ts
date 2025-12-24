/**
 * @fileoverview Legal Information Component
 * @description Displays links to Impressum and Datenschutz pages
 * @module LegalInformationComponent
 */

import { Component } from '@angular/core';
import { LinkButtonComponent } from '@shared/components';

@Component({
  selector: 'app-legal-information',
  imports: [LinkButtonComponent],
  templateUrl: './legal-information.component.html',
  styleUrl: './legal-information.component.scss',
})
export class LegalInformationComponent {}
