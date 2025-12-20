/**
 * @fileoverview Environment configuration for production mode.
 * @description This file contains the Firebase configuration settings
 * for the DABubble application in production mode.
 * @module Environment
 * @author DABubble Team
 */

export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_PROJECT.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT.appspot.com',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
  },
};
