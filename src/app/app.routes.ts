/**
 * @fileoverview Application routing configuration.
 * @description This file defines the routing configuration for the DABubble application.
 * @module AppRoutes
 */

import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { noAuthGuard } from '@core/guards/no-auth.guard';

export const routes: Routes = [
  // Public Routes (with noAuthGuard - redirects to /chat if authenticated)
  // {
  //   path: 'login',
  //   loadComponent: () => import('./features/auth/pages/login/login.component').then((m) => m.LoginComponent),
  //   canActivate: [noAuthGuard],
  // },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register/register.component').then((m) => m.RegisterComponent),
    canActivate: [noAuthGuard],
  },
  // {
  //   path: 'password-forgot',
  //   loadComponent: () =>
  //     import('./pages/password-forgot/password-forgot.component').then(
  //       (m) => m.PasswordForgotComponent
  //     ),
  //   canActivate: [noAuthGuard],
  // },

  // Protected Routes (with authGuard - requires authentication)
  // {
  //   path: 'avatar-selection',
  //   loadComponent: () =>
  //     import('./pages/avatar-selection/avatar-selection.component').then(
  //       (m) => m.AvatarSelectionComponent
  //     ),
  //   canActivate: [authGuard],
  // },
  // {
  //   path: 'chat',
  //   loadComponent: () => import('./pages/chat/chat.component').then((m) => m.ChatComponent),
  //   canActivate: [authGuard],
  // },
  // {
  //   path: 'profile',
  //   loadComponent: () =>
  //     import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
  //   canActivate: [authGuard],
  // },

  // Legal Pages (public, no guard)
  // {
  //   path: 'imprint',
  //   loadComponent: () =>
  //     import('./pages/imprint/imprint.component').then((m) => m.ImprintComponent),
  // },
  // {
  //   path: 'privacy',
  //   loadComponent: () =>
  //     import('./pages/privacy/privacy.component').then((m) => m.PrivacyComponent),
  // },

  // Demo Route (temporary)
  // {
  //   path: 'demo',
  //   loadComponent: () =>
  //     import('./components/primeng-demo.component').then((m) => m.PrimengDemoComponent),
  // },

  // Redirects
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: '**', redirectTo: '/register' },
];
