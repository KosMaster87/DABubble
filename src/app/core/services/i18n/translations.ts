/**
 * @fileoverview Internationalization Translations and Service
 * @description Type-safe translations for DABubble with Signal-based service
 * @module I18nService
 */

export const translations = {
  de: {
    // Common
    COMMON: {
      APP_NAME: 'DABubble',
      LOADING: 'Wird geladen...',
      ERROR: 'Fehler',
      SUCCESS: 'Erfolgreich',
      CANCEL: 'Abbrechen',
      SAVE: 'Speichern',
      DELETE: 'Löschen',
      EDIT: 'Bearbeiten',
      SEARCH: 'Suchen',
    },

    // Auth
    AUTH: {
      LOGIN: 'Anmelden',
      LOGOUT: 'Abmelden',
      REGISTER: 'Registrieren',
      EMAIL: 'E-Mail',
      PASSWORD: 'Passwort',
      FORGOT_PASSWORD: 'Passwort vergessen?',
      REMEMBER_ME: 'Angemeldet bleiben',
      NO_ACCOUNT: 'Noch kein Konto?',
      ALREADY_ACCOUNT: 'Bereits ein Konto?',
    },

    // Chat
    CHAT: {
      NEW_MESSAGE: 'Neue Nachricht',
      TYPE_MESSAGE: 'Nachricht eingeben...',
      SEND: 'Senden',
      EMOJI: 'Emoji',
      ATTACH: 'Anhang',
      ONLINE: 'Online',
      OFFLINE: 'Offline',
    },

    // Channels
    CHANNELS: {
      TITLE: 'Channels',
      NEW_CHANNEL: 'Neuer Channel',
      CREATE: 'Channel erstellen',
      NAME: 'Channel-Name',
      DESCRIPTION: 'Beschreibung',
      MEMBERS: 'Mitglieder',
      ADD_MEMBERS: 'Mitglieder hinzufügen',
    },

    // Profile
    PROFILE: {
      TITLE: 'Profil',
      EDIT_PROFILE: 'Profil bearbeiten',
      NAME: 'Name',
      STATUS: 'Status',
      AVATAR: 'Profilbild',
      CHANGE_AVATAR: 'Profilbild ändern',
      SETTINGS: 'Einstellungen',
    },

    // Settings
    SETTINGS: {
      TITLE: 'Einstellungen',
      THEME: 'Design',
      LIGHT: 'Hell',
      DARK: 'Dunkel',
      AUTO: 'Automatisch',
      LANGUAGE: 'Sprache',
      NOTIFICATIONS: 'Benachrichtigungen',
      PRIVACY: 'Datenschutz',
    },

    // Errors
    ERRORS: {
      NETWORK: 'Netzwerkfehler. Bitte versuchen Sie es erneut.',
      AUTH_FAILED: 'Anmeldung fehlgeschlagen',
      INVALID_EMAIL: 'Ungültige E-Mail-Adresse',
      INVALID_PASSWORD: 'Passwort muss mindestens 8 Zeichen lang sein',
      USER_NOT_FOUND: 'Benutzer nicht gefunden',
      EMAIL_IN_USE: 'E-Mail-Adresse bereits in Verwendung',
      WEAK_PASSWORD: 'Passwort zu schwach',
    },
  },

  en: {
    // Common
    COMMON: {
      APP_NAME: 'DABubble',
      LOADING: 'Loading...',
      ERROR: 'Error',
      SUCCESS: 'Success',
      CANCEL: 'Cancel',
      SAVE: 'Save',
      DELETE: 'Delete',
      EDIT: 'Edit',
      SEARCH: 'Search',
    },

    // Auth
    AUTH: {
      LOGIN: 'Login',
      LOGOUT: 'Logout',
      REGISTER: 'Register',
      EMAIL: 'Email',
      PASSWORD: 'Password',
      FORGOT_PASSWORD: 'Forgot password?',
      REMEMBER_ME: 'Remember me',
      NO_ACCOUNT: 'No account yet?',
      ALREADY_ACCOUNT: 'Already have an account?',
    },

    // Chat
    CHAT: {
      NEW_MESSAGE: 'New message',
      TYPE_MESSAGE: 'Type a message...',
      SEND: 'Send',
      EMOJI: 'Emoji',
      ATTACH: 'Attach',
      ONLINE: 'Online',
      OFFLINE: 'Offline',
    },

    // Channels
    CHANNELS: {
      TITLE: 'Channels',
      NEW_CHANNEL: 'New channel',
      CREATE: 'Create channel',
      NAME: 'Channel name',
      DESCRIPTION: 'Description',
      MEMBERS: 'Members',
      ADD_MEMBERS: 'Add members',
    },

    // Profile
    PROFILE: {
      TITLE: 'Profile',
      EDIT_PROFILE: 'Edit profile',
      NAME: 'Name',
      STATUS: 'Status',
      AVATAR: 'Avatar',
      CHANGE_AVATAR: 'Change avatar',
      SETTINGS: 'Settings',
    },

    // Settings
    SETTINGS: {
      TITLE: 'Settings',
      THEME: 'Theme',
      LIGHT: 'Light',
      DARK: 'Dark',
      AUTO: 'Auto',
      LANGUAGE: 'Language',
      NOTIFICATIONS: 'Notifications',
      PRIVACY: 'Privacy',
    },

    // Errors
    ERRORS: {
      NETWORK: 'Network error. Please try again.',
      AUTH_FAILED: 'Authentication failed',
      INVALID_EMAIL: 'Invalid email address',
      INVALID_PASSWORD: 'Password must be at least 8 characters',
      USER_NOT_FOUND: 'User not found',
      EMAIL_IN_USE: 'Email already in use',
      WEAK_PASSWORD: 'Password too weak',
    },
  },
} as const;

// Type for supported languages
export type SupportedLanguage = keyof typeof translations;

// Deep key type for type-safe translation keys
export type TranslationKey = {
  [K in keyof typeof translations.de]: {
    [P in keyof (typeof translations.de)[K]]: `${K & string}.${P & string}`;
  }[keyof (typeof translations.de)[K]];
}[keyof typeof translations.de];
