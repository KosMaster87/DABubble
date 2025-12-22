/**
 * @fileoverview Auth Layout Component
 * @description Layout wrapper for all authentication-related pages with Header and Footer
 * @module AuthLayoutComponent
 */

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@layout/header/header.component';
import { FooterComponent } from '@layout/footer/footer.component';

/**
 * Auth Layout Component
 * @class AuthLayoutComponent
 * @description Provides consistent layout (Header + Content + Footer) for all auth pages
 */
@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {}
