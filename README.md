# 💬 DABubble – Discord Clone Chat App

[![Angular](https://img.shields.io/badge/Angular-21.0-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

A modern, real-time chat application inspired by Discord, built with Angular 21, Firebase, and TypeScript. Features channels, direct messages, threads, reactions, and user management.

---

## 🚀 Live Demo

🔗 **Coming Soon**

---

## 📸 Preview

_Screenshots coming soon_

---

## ✨ Features

### 👤 User Account & Administration

- 🔐 **User Registration** – Email/password with avatar selection
- 🔑 **User Login** – Secure authentication with Firebase
- 🔄 **Password Recovery** – Reset password via email
- ✏️ **Profile Editing** – Update name and avatar
- 📱 **Responsive Menu** – Minimizable channels/DM sidebar
- 🟢 **Online Status** _(Optional)_ – Real-time user presence

### 💬 Channels & Direct Messages

- 💌 **Direct Messages** – Private 1:1 conversations
- 😄 **Emoticon Reactions** – React to messages with emojis
- 🎨 **Emoticons in Messages** – Rich emoji support
- @ **Mention Users** – Tag members with `@username`
- \# **Mention Channels** – Reference channels with `#channel`
- 🧵 **Threads** – Reply to specific messages in threads
- 🔍 **Search Messages** – Find messages across channels and DMs

### 🔧 Channel Management

- ➕ **Create Channels** – Set name, description, and members
- 👥 **Add Members** – Invite users to existing channels
- 🚪 **Leave Channels** – Exit channels you don't need
- ✏️ **Edit Channels** – Modify name and description
- 🔒 **Duplicate Prevention** – No duplicate channel names

---

## 🛠️ Tech Stack

**Frontend**

- Angular 21 (Standalone Components, Signals)
- TypeScript 5.9 (Strict mode)
- SCSS (BEM Methodology)
- RxJS 7.8

**Backend & Database**

- Firebase Authentication
- Cloud Firestore (NoSQL Database)
- Firebase Storage (File uploads)
- Real-time listeners

**Code Quality**

- TypeScript Strict Mode
- ESLint & Prettier
- JSDoc Documentation
- Max 14 lines per function
- Max 400 LOC per file

**DevOps**

- GitHub (Version Control)
- Firebase Hosting
- Continuous Integration

---

## 📁 Project Structure

```
dabubble/
├── .github/
│   ├── prompts/
│   │   ├── copilot-angular.prompt.md      # Angular dev standards
│   │   └── copilot-project.prompt.md      # Project requirements
│   └── workflows/
│       └── deploy.yml                     # CI/CD Pipeline (future)
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── core/                          # Core services & guards
│   │   │   ├── guards/                    # Auth guards
│   │   │   ├── interceptors/              # HTTP interceptors
│   │   │   └── services/                  # Core services
│   │   │       ├── auth.service.ts        # Firebase authentication
│   │   │       ├── firestore.service.ts   # Database operations
│   │   │       └── storage.service.ts     # File uploads
│   │   ├── features/                      # Feature modules
│   │   │   ├── auth/                      # Authentication
│   │   │   │   ├── components/
│   │   │   │   │   ├── login/
│   │   │   │   │   ├── register/
│   │   │   │   │   └── password-reset/
│   │   │   │   └── pages/
│   │   │   │       └── auth-page/
│   │   │   ├── channels/                  # Channel management
│   │   │   │   ├── components/
│   │   │   │   │   ├── channel-list/
│   │   │   │   │   ├── channel-create/
│   │   │   │   │   └── channel-settings/
│   │   │   │   └── services/
│   │   │   │       └── channel.service.ts
│   │   │   ├── messages/                  # Messages & threads
│   │   │   │   ├── components/
│   │   │   │   │   ├── message-list/
│   │   │   │   │   ├── message-input/
│   │   │   │   │   ├── thread-view/
│   │   │   │   │   └── reaction-picker/
│   │   │   │   └── services/
│   │   │   │       └── message.service.ts
│   │   │   └── users/                     # User management
│   │   │       ├── components/
│   │   │       │   ├── user-profile/
│   │   │       │   ├── user-list/
│   │   │       │   └── avatar-picker/
│   │   │       └── services/
│   │   │           └── user.service.ts
│   │   ├── layout/                        # App layout
│   │   │   ├── header/
│   │   │   ├── sidebar/
│   │   │   └── main-view/
│   │   ├── shared/                        # Shared components
│   │   │   ├── components/
│   │   │   │   ├── button/
│   │   │   │   ├── input/
│   │   │   │   └── modal/
│   │   │   ├── directives/
│   │   │   ├── pipes/
│   │   │   └── utils/
│   │   ├── models/                        # TypeScript interfaces
│   │   │   ├── user.model.ts
│   │   │   ├── channel.model.ts
│   │   │   ├── message.model.ts
│   │   │   └── reaction.model.ts
│   │   ├── app.ts                         # Root component
│   │   ├── app.config.ts                  # App configuration
│   │   ├── app.routes.ts                  # Route definitions
│   │   └── app.scss                       # Root styles
│   ├── assets/
│   │   ├── fonts/
│   │   │   ├── figtree/                   # Figtree font family
│   │   │   └── nunito/                    # Nunito font family
│   │   └── images/
│   │       ├── avatars/                   # User avatars
│   │       └── icons/                     # App icons
│   ├── config/
│   │   └── environments/
│   │       ├── env.dev.ts                 # Dev config (not in Git)
│   │       ├── env.dev.example.ts         # Dev template
│   │       ├── env.prod.ts                # Prod config (not in Git)
│   │       └── env.prod.example.ts        # Prod template
│   ├── styles/                            # Global SCSS
│   │   ├── components/                    # Component styles (BEM)
│   │   ├── _fonts.figtree.scss            # Figtree font-face
│   │   ├── _fonts.nunito.scss             # Nunito font-face
│   │   ├── _layout.scss                   # Layout utilities
│   │   ├── _mixins.scss                   # SCSS mixins
│   │   ├── _typography.scss               # Typography
│   │   └── _variables.scss                # CSS custom properties
│   ├── index.html                         # HTML entry point
│   ├── main.ts                            # Application bootstrap
│   └── styles.scss                        # Global styles entry
├── .gitignore                             # Git ignore rules
├── angular.json                           # Angular workspace config
├── package.json                           # Dependencies & scripts
├── tsconfig.json                          # TypeScript config
├── tsconfig.app.json                      # App-specific TS config
└── README.md                              # This file
```

---

## 🎨 Design System

### Color Palette

```scss
--primary-color: #444df2        // Primary brand color
--secondary-color: #535af1      // Secondary actions
--link-color: #797ef3           // Links and highlights
--text-color: #000000           // Main text
--background-color: #eceefe     // App background
--container-bg: #ffffff         // Card/container backgrounds
```

### Typography

- **Primary Font:** Nunito (sans-serif)
- **Secondary Font:** Figtree (sans-serif)
- **Base Size:** 16px (1rem)
- **Responsive scaling** with clamp()

### BEM Naming

All SCSS follows BEM methodology:

```scss
.message-card {
} // Block
.message-card__header {
} // Element
.message-card--highlighted {
} // Modifier
```

---

## 📋 User Stories (Implementation Checklist)

### ✅ User Account & Administration

- [ ] User registration with email/password
- [ ] User login with authentication
- [ ] Password recovery via email
- [ ] Profile editing (name, avatar)
- [ ] Minimizable sidebar menu
- [ ] Online status (optional)

### ✅ Channels & Direct Messages

- [ ] Direct messaging between users
- [ ] React to messages with emoticons
- [ ] Send messages with emoticons
- [ ] Mention users with `@`
- [ ] Mention channels with `#`
- [ ] Create threads on messages
- [ ] Search messages globally

### ✅ Channel Management

- [ ] Create new channels
- [ ] Add members to channels
- [ ] Leave channels
- [ ] Edit channel details
- [ ] Prevent duplicate channel names

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Angular CLI 21+
- Firebase account
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/dabubble.git
cd dabubble
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure Firebase**

Copy the example environment files:

```bash
cp src/config/environments/env.dev.example.ts src/config/environments/env.dev.ts
cp src/config/environments/env.prod.example.ts src/config/environments/env.prod.ts
```

Edit `env.dev.ts` with your Firebase credentials:

```typescript
export const env = {
  production: false,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'your-project.firebaseapp.com',
    projectId: 'your-project-id',
    storageBucket: 'your-project.appspot.com',
    messagingSenderId: '123456789',
    appId: '1:123456789:web:abcdef',
  },
};
```

4. **Start development server**

```bash
npm start
```

Navigate to `http://localhost:4200/`

---

## 🧪 Development

### Available Scripts

```bash
npm start          # Start dev server (port 4200)
npm run build      # Build for production
npm run watch      # Build with watch mode
npm test           # Run unit tests
ng generate        # Generate components/services/etc.
```

### Code Standards

- **Functions:** Max 14 lines, one task per function
- **Files:** Max 400 LOC per file
- **Naming:** camelCase for variables/functions
- **Types:** TypeScript strict mode, no `any`
- **Docs:** JSDoc comments for all public methods
- **CSS:** BEM naming convention

---

## 🔒 Security

- Firebase Authentication for user management
- Firestore Security Rules for data protection
- Input validation and sanitization
- XSS protection
- CORS configuration
- Environment variables for secrets

---

## 📖 Documentation

- [Copilot Angular Standards](.github/prompts/copilot-angular.prompt.md)
- [Project Requirements](.github/prompts/copilot-project.prompt.md)
- [Component READMEs](./src/app/)

---

## 🤝 Contributing

This is a student project. Contributions are not currently accepted, but feel free to fork and customize!

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

**Konstantin Aksenov**

- 🌐 Portfolio: [portfolio.dev2k.org](https://portfolio.dev2k.org)
- 💼 LinkedIn: [LinkedIn](https://www.linkedin.com/in/konstantin-aksenov-802b88190/)
- 🐙 GitHub: [@KosMaster87](https://github.com/KosMaster87)
- 📧 Email: konstantin.aksenov@dev2k.org

---

## 🙏 Acknowledgments

- Angular Team for the amazing framework
- Firebase for backend infrastructure
- Developer Academy for project requirements
- Figma design team for UI/UX inspiration

---

**Last Updated:** December 2025
**Version:** 0.0.0 (In Development)
