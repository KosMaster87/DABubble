/**
 * @fileoverview Main entry point for the DABubble application.
 * @description This file bootstraps the Angular application using the
 * root component and application configuration.
 * @module Main
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
