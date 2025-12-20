/**
 * @fileoverview Application configuration for DABubble.
 * @description This file sets up the application-wide configuration,
 * including routing and global error handling.
 * @module AppConfig
 */

import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes)],
};
