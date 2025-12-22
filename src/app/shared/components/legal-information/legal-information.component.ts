/**
 * @fileoverview Legal Information Component
 * @description Displays links to Impressum and Datenschutz pages
 * @module LegalInformationComponent
 */

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-legal-information',
  imports: [RouterModule],
  templateUrl: './legal-information.component.html',
  styleUrl: './legal-information.component.scss',
})
export class LegalInformationComponent {}
