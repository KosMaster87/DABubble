/**
 * @fileoverview Environment configuration for production mode.
 * @description This file contains the Firebase configuration settings
 * for the DABubble application in production mode.
 * @module Environment
 */

export const environment = {
  production: true,
  firebase: {
    apiKey: 'YOUR_PROD_API_KEY',
    authDomain: 'YOUR_PROD_PROJECT.firebaseapp.com',
    projectId: 'YOUR_PROD_PROJECT_ID',
    storageBucket: 'YOUR_PROD_PROJECT.appspot.com',
    messagingSenderId: 'YOUR_PROD_SENDER_ID',
    appId: 'YOUR_PROD_APP_ID',
  },
};
