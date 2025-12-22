---
agent: agent
---

# 🎯 DABubble Project - Definition of Done & Requirements

## Overview

DABubble is a Discord clone chat application built with Angular, Firebase, and TypeScript. This document contains all project requirements, user stories, and quality standards that must be met before project submission.

---

## ✅ General Requirements

### Functionality

- All links and buttons must work correctly
- No console errors allowed
- Application must work in incognito mode
- All features must function as specified in user stories

### Design (Figma 1:1 Implementation)

- **Colors:** Match Figma exactly
- **Spacing:** Consistent spacing between elements
- **Margins:** Equal margins to edges on all pages
- **Typography:** Exact font families and sizes from Figma
- **Favicon:** Must be present
- **Buttons:** Must have `cursor: pointer;` CSS property
- **Inputs/Buttons:** No default browser borders

### Responsiveness

- Responsive down to 320px width
- No horizontal scrollbars at any resolution
- Mobile-first approach

### Forms & Validation

- Proper form validation for all inputs
- Specific error messages (no browser alerts or HTML5 validation)
- Buttons must have enabled/disabled/hover states
- Empty input handling with user-friendly feedback

---

## 💻 TypeScript & Clean Code Standards

### Strict Requirements

- TypeScript strict mode enabled in compiler
- No use of `any` type
- Proper type definitions for all variables and functions

### Function Rules

- **One task per function**
- **Maximum 14 lines per function**
- **Descriptive function names** (short and concise)
- **camelCase naming** (e.g., `shoppingCart`, not `Shopping_Cart`)
- **First letter lowercase** for functions and variables
- **1-2 blank lines** between functions
- **No namespace conflicts** with reserved words

### File & Folder Structure

- **Maximum 400 LOC** (Lines of Code) per file
- Logical folder structure:
  - `components/` - UI components
  - `services/` - Business logic and API calls
  - `models/` - TypeScript interfaces and types
  - `guards/` - Route guards
  - `shared/` - Shared utilities and components
  - `assets/img/` - Images and icons
  - `pipes/` - Custom Angular pipes (if needed)

### Documentation

- **Optional but recommended:** Use [Compodoc](https://compodoc.app) for code documentation
- **JSDoc comments** for all public methods and components

---

## 🔥 GitHub Guidelines

### Repository Setup

- **Public repository** required
- GitHub used from day 1 of project
- Regular commits from all team members (minimum one per work session)
- Meaningful commit messages (describe what changed and why)
- `.gitignore` configured to exclude unnecessary files
- After group work completion, each member forks the project

### Commit Message Convention

```
feat: Add user authentication with Firebase
fix: Resolve channel creation duplicate name issue
docs: Update README with setup instructions
refactor: Simplify message sending logic
style: Format code according to ESLint rules
```

---

## 👤 User Account & Administration

### User Story 1: Registration

**As a new user, I want to register to access and use the app.**

**Acceptance Criteria:**

- Registration form with email, name, and password fields
- Specific error messages for invalid input (invalid email, weak password)
- ✅ **Optional:** Google Account registration
- ✅ **Optional:** Confirmation email after successful registration
- Avatar selection during registration

### User Story 2: Login

**As a user, I want to log in to access my account.**

**Acceptance Criteria:**

- Login form with email and password fields
- Access granted with correct credentials
- Specific error messages for incorrect credentials (shown under affected field)

### User Story 3: Password Recovery

**As a user, I want a "Forgot Password" option to recover my account.**

**Acceptance Criteria:**

- "Forgot Password" link on login page
- Email input to receive password reset instructions
- Email sent with reset link
- User can log in with new password after reset

### User Story 4: Profile Editing

**As a user, I want to edit my name and avatar in my profile.**

**Acceptance Criteria:**

- Profile edit option in user settings
- Ability to change name in edit mode
- Updated information displayed in user profile after saving
- Avatar selection from predefined options

### User Story 5: Menu Minimization

**As a user, I want to minimize the channels and DM menu for more screen space, especially on mobile.**

**Acceptance Criteria:**

- Icon/button to minimize the channels and DM menu
- Chat view expands when menu is minimized
- Option to maximize menu again
- **Mobile:** Separate views for menu and chat; selecting a channel/DM switches to chat view

### User Story 6: Online Status (Optional)

**As a user, I want to see other users' online status.**

**Acceptance Criteria:**

- Visible online status (online, offline, away) for each user
- Real-time status updates based on user activity
- Status visible next to name/avatar in chats, channels, and menu

---

## 💬 Writing in Channels & Direct Messages

### User Story 1: Direct Messages

**As a user, I want to send direct messages to other members.**

**Acceptance Criteria:**

- Start DM conversation with any user
- DMs visible only to participants
- Focus automatically set to input field when switching channels/DMs

### User Story 2: React with Emoticons

**As a user, I want to react to messages with emoticons.**

**Acceptance Criteria:**

- Option to react with emoticon on any message
- Predefined emoticon selection available
- Last 2 used emoticons directly selectable via action bar (default emoticons if none used)
- Reactions displayed under message, visible to all users
- **Desktop:** Max 20 reactions visible
- **Mobile/Thread:** Max 7 reactions visible + "+ x more" button
- Users can see who reacted with which emoticon
- Multiple identical reactions shown with counter

### User Story 3: Write with Emoticons

**As a user, I want to include emoticons in my messages.**

**Acceptance Criteria:**

- Emoticon selector when composing messages
- Emoticons inserted into message text
- Emoticons visible in sent messages
- Predefined emoticon selection
- Other users can see emoticons in messages

### User Story 4: Mention Channels & Members

**As a user, I want to mention channels (#) and members (@) when composing messages.**

**Acceptance Criteria:**

- Typing "#" shows dropdown with all existing channels
- Typing "@" shows dropdown with all members in current space
- Further typing filters results in real-time
- Optimal user experience with live updates

### User Story 5: Threads

**As a user, I want to start threads on specific messages in channels and private chats.**

**Acceptance Criteria:**

- Click message and select "Start Thread" icon
- Other users can reply in thread and continue discussion
- Threads clearly marked and distinguishable from main messages
- Dropdown opens after "#" or "@" for tagging channels/members

### User Story 6: Search

**As a user, I want to search messages in channels and private chats.**

**Acceptance Criteria:**

- Keyword search across all chats and channels
- Search results show message context
- Typing after "#" or "@" opens dropdown
- Further typing filters and refines results
- Real-time list updates for optimal UX

---

## 🔧 Channel Management

### User Story 1: Create Channels

**As a user, I want to create channels for group discussions.**

**Acceptance Criteria:**

- Create new channels with name and description
- Channel creator can invite other users
- All channel members can send and receive messages
- Duplicate channel name validation to prevent confusion

### User Story 2: Add Users to Channels

**As a channel member, I want to add other users to the channel.**

**Acceptance Criteria:**

- Every channel member can add users
- Add users option in channel menu
- Select one or multiple users from list to add

### User Story 3: Leave Channels

**As a channel member, I want to leave channels.**

**Acceptance Criteria:**

- Option to leave channel
- Leave option in channel settings
- Confirmation before leaving

### User Story 4: Edit Channel Details

**As a user, I want to edit channel names and descriptions.**

**Acceptance Criteria:**

- Access channel settings to edit name and description
- Changes take effect immediately
- Changes visible to all channel members
- Duplicate channel name validation to prevent confusion
- Warning/error messages if changes unsuccessful

---

## 🎨 Design System

### Color Variables (CSS Custom Properties)

```scss
--primary-color: #444df2
--secondary-color: #535af1
--link-color: #797ef3
--text-color: #000000
--background-color: #eceefe
--container-bg: white
```

### Typography

- **Primary Font:** Nunito (sans-serif)
- **Secondary Font:** Figtree (sans-serif)
- **Base Size:** 16px (1rem)
- **Scale:** Clamp values for responsive scaling

### Spacing Scale

```scss
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px
```

---

## 📋 Checklist Before Submission

- [ ] All user stories implemented and tested
- [ ] No console errors
- [ ] Works in incognito mode
- [ ] Design matches Figma 1:1
- [ ] Responsive down to 320px
- [ ] All forms validated with specific error messages
- [ ] TypeScript strict mode enabled
- [ ] All functions ≤ 14 lines
- [ ] All files ≤ 400 LOC
- [ ] Proper folder structure
- [ ] `.gitignore` configured
- [ ] Regular commits with meaningful messages
- [ ] Public GitHub repository
- [ ] Favicon present
- [ ] Buttons have `cursor: pointer`
- [ ] No default input/button borders

---

**Last Updated:** December 2025
**Project:** DABubble - Discord Clone
**Framework:** Angular 21+ Standalone Components
