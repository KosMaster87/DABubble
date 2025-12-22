/**
 * @fileoverview Application routing configuration.
 * @description This file defines the routing configuration for the DABubble application.
 * @module AppRoutes
 */

import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { noAuthGuard } from '@core/guards/no-auth.guard';
import { avatarSelectionGuard } from '@core/guards/avatar-selection.guard';

export const routes: Routes = [
  // Auth Layout (with Header + Footer for all auth/legal pages)
  {
    path: 'auth',
    loadComponent: () =>
      import('./layout/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: [
      // Auth Pages (with noAuthGuard - redirects to /dashboard if authenticated)
      {
        path: 'signin',
        loadComponent: () =>
          import('./features/auth/pages/signin/signin.component').then((m) => m.SigninComponent),
        canActivate: [noAuthGuard],
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./features/auth/pages/signup/signup.component').then((m) => m.SignupComponent),
        canActivate: [noAuthGuard],
      },
      {
        path: 'password-forgot',
        loadComponent: () =>
          import('./features/auth/pages/password-forgot/password-forgot.component').then(
            (m) => m.PasswordForgotComponent
          ),
        canActivate: [noAuthGuard],
      },
      {
        path: 'password-restore',
        loadComponent: () =>
          import('./features/auth/pages/password-restore/password-restore.component').then(
            (m) => m.PasswordRestoreComponent
          ),
        // No guard - needs oobCode from email link
      },
      {
        path: 'verify-email',
        loadComponent: () =>
          import('./features/auth/pages/verify-email/verify-email.component').then(
            (m) => m.VerifyEmailComponent
          ),
        // No guard - needs oobCode from email link
      },
      {
        path: 'avatar-selection',
        loadComponent: () =>
          import('./features/auth/pages/avatar-selection/avatar-selection.component').then(
            (m) => m.AvatarSelectionComponent
          ),
        canActivate: [avatarSelectionGuard],
      },

      // Legal Pages (public, no guard)
      {
        path: 'imprint',
        loadComponent: () =>
          import('./features/legal/pages/imprint/imprint.component').then(
            (m) => m.ImprintComponent
          ),
      },
      {
        path: 'privacy-police',
        loadComponent: () =>
          import('./features/legal/pages/privacy-police/privacy-police.component').then(
            (m) => m.PrivacyPoliceComponent
          ),
      },

      // Default redirect for /auth
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
    ],
  },

  // Protected Routes (with authGuard - requires authentication)
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/pages/main/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard],
  },

  // Redirects
  { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth/signin' },
];
