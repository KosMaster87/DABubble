/**
 * @fileoverview Barrel file for core module exports.
 * @description This file re-exports services, guards, and models from the core module
 * for easier imports elsewhere in the application.
 * @module core/index
 */

// Services
export { FirebaseService } from './services/firebase/firebase.service';
export { I18nService } from './services/i18n/i18n.service';
export { TranslatePipe } from './services/i18n/translate.pipe';
export { translations } from './services/i18n/translations';
export type { SupportedLanguage, TranslationKey } from './services/i18n/translations';

// Guards
export { authGuard } from './guards/auth.guard';
export { noAuthGuard } from './guards/no-auth.guard';

// Models (add when created)
// export type { User } from './models/user.model';
// export type { Channel } from './models/channel.model';
// export type { Message } from './models/message.model';
