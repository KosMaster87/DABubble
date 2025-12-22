# Layout Module

Persistente Layout-Komponenten für DABubble.

## 📁 Struktur

```
layout/
├── main-layout/       ← Haupt-Layout mit Sidebar (Dashboard/Chat)
├── sidebar/           ← Navigation Sidebar
└── header/            ← Top Header Bar
```

**Note**: Auth-Layout Components (AuthLayoutComponent, HeaderComponent, FooterComponent) befinden sich in `core/components/` da sie als Core Infrastructure betrachtet werden.

---

## 🎯 Zweck

Der `layout/` Ordner enthält **persistente UI-Komponenten**, die:

- Auf **mehreren Seiten** sichtbar sind (nach Login)
- Das **Grundgerüst** der Hauptanwendung bilden
- **Navigation** und **globale Actions** bereitstellen

**Wichtig**: Auth-Seiten (/auth/\*) nutzen `AuthLayoutComponent` aus `core/components/`

## 📋 Components

### MainLayout

**Zweck**: Haupt-Layout mit Sidebar und Content-Area
**Verwendung**: Wrapper für alle Chat/Channel Pages

**Features**:

- Sidebar Integration
- Content Area (RouterOutlet)
- Responsive Layout
- Mobile-Optimierung

**Struktur**:

```html
<div class="main-layout">
  <app-sidebar />
  <div class="content">
    <app-header />
    <main>
      <router-outlet />
    </main>
  </div>
</div>
```

---

### Sidebar

**Zweck**: Navigation & Channel-Liste
**Verwendung**: Persistent in MainLayout

**Features**:

- Channel-Liste
- Direct Messages
- User-Profile Quick-Access
- Search
- Mobile Toggle

**Dependencies**:

- NavigationService
- ChannelService
- UserService

---

### Header

**Zweck**: Top Navigation Bar mit Actions
**Verwendung**: Persistent in MainLayout

**Features**:

- Breadcrumb/Title
- Search
- Notifications
- User Menu
- Language Switcher
- Theme Switcher

**Dependencies**:

- I18nService
- ThemeService
- AuthService

---

## 🔧 Verwendung

### In App Routes

```typescript
// app.routes.ts
export const routes: Routes = [
  // Auth Routes (separate layout)
  {
    path: 'auth',
    loadComponent: () =>
      import('./core/components/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    canActivate: [noAuthGuard],
    children: [
      { path: 'signin', loadComponent: () => import('./features/auth/pages/signin/...') },
      { path: 'signup', loadComponent: () => import('./features/auth/pages/signup/...') },
    ],
  },
  // Main App Routes (main layout)
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'chat', loadComponent: () => import('./features/chat/pages/chat-page/...') },
      { path: 'channels', loadComponent: () => import('./features/channels/pages/...') },
    ],
  },
];
```

### MainLayout Component

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  template: `
    <div class="main-layout">
      <app-sidebar />
      <div class="content">
        <app-header />
        <main>
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
```

## 🎨 Responsive Behavior

### Desktop (> 768px)

```
┌─────────┬──────────────────────┐
│         │ Header               │
│ Sidebar ├──────────────────────┤
│         │                      │
│         │ Content (Outlet)     │
│         │                      │
└─────────┴──────────────────────┘
```

### Mobile (< 768px)

```
┌──────────────────────────────┐
│ Header [☰]                   │
├──────────────────────────────┤
│                              │
│ Content (Outlet)             │
│                              │
│                              │
└──────────────────────────────┘

Sidebar: Overlay/Drawer when toggled
```

## 📦 Imports

```typescript
// Layout Components
import { MainLayoutComponent } from '@layout/main-layout/main-layout.component';
import { SidebarComponent } from '@layout/sidebar/sidebar.component';
import { HeaderComponent } from '@layout/header/header.component';

// Core Services
import { I18nService } from '@core/services/i18n';
import { FirebaseService } from '@core/services/firebase/firebase.service';

// Shared Components
import { LanguageSwitcherComponent } from '@shared/components/language-switcher/language-switcher.component';
```

## ⚠️ Best Practices

1. **Keine Business-Logik** - Layout ist nur Presentation
2. **Services nur für UI-State** - Keine Domain-Services
3. **Responsive Design** - Mobile-First Approach
4. **Accessibility** - Keyboard Navigation, ARIA Labels
5. **Theme-Aware** - Dark/Light Mode Support
6. **Separate Layouts** - Auth-Layout in `core/`, Main-Layout in `layout/`

---

## 🆚 Layout vs. Feature Components

| Aspekt           | Layout            | Feature            |
| ---------------- | ----------------- | ------------------ |
| Persistenz       | ✅ Immer sichtbar | ❌ Page-spezifisch |
| Route            | ❌ Kein Routing   | ✅ Lazy Loaded     |
| Wiederverwendung | ✅ App-weit       | ⚠️ Feature-intern  |
| Business-Logik   | ❌ Nein           | ✅ Ja              |

---

## 🔗 Related Documentation

- [Core README](../core/CORE-README.md) - AuthLayoutComponent, HeaderComponent, FooterComponent
- [Features README](../features/FEATURES-README.md) - Feature Pages & Components
- [Shared README](../shared/SHARED-README.md) - Shared UI Components

---

**Version:** 1.1
**Last Updated:** December 2025
**Changes:** Clarified separation between Auth Layout (core/) and Main Layout (layout/)
