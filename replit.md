# ReadmeHub - README Contribution Platform

## Overview

ReadmeHub is a satirical web application that gamifies README contributions, styled as a Hacktoberfest parody platform. Users can make low-effort contributions (fixing typos, adding emojis, adding motivational quotes) to fake repositories and earn badges based on their contribution count. The platform features contribution tracking, shareable social media cards, and a GitHub-style contribution graph.

**Status**: ✅ Complete and ready for user testing. All core features implemented and tested.

**Last Updated**: October 5, 2025

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: Next.js 15 with App Router (React Server Components)
- **Rationale**: Modern React framework providing server-side rendering, file-based routing, and excellent developer experience
- **Rendering Strategy**: Hybrid approach using both Server Components (for data fetching) and Client Components (for interactivity)
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, customizable UI components
- **Design Pattern**: Page-based routing with server-side data fetching at the page level, client components for interactive features

**Key Frontend Components**:
- **Server Components**: Pages that fetch data directly from Prisma (dashboard, profile, repository pages)
- **Client Components**: Interactive elements like sign-out buttons, contribution forms, and exportable contribution cards
- **Shared UI**: Reusable components from shadcn/ui (Button, Card, Badge, Avatar, Input, Label)

**State Management**:
- Server-side data fetching for initial page loads
- Client-side state using React hooks for interactive features
- No global state management library (relies on server components and URL-based state)

### Backend Architecture

**Framework**: Next.js API Routes (serverless functions)
- **Rationale**: Collocated with frontend code, serverless deployment model, TypeScript support
- **API Structure**: RESTful endpoints organized by feature (auth, contributions, repositories)

**Authentication System**:
- Cookie-based session management (no external auth provider)
- Simple username-only authentication (no passwords)
- HTTP-only cookies for security
- Session validation through middleware-style checks in API routes

**Core API Endpoints**:
- `/api/auth/signin` - Create/retrieve user and set session cookie
- `/api/auth/signout` - Clear session cookie
- `/api/auth/user` - Get current user data
- `/api/contribute` - Create new contributions and award badges
- `/api/repos/[name]` - Fetch repository details and recent contributions

**Business Logic**:
- Badge awarding system triggered after each contribution
- Contribution counting and categorization by type (typo, emoji, quote)
- Repository README updates with contribution content

### Data Storage

**Database**: Prisma ORM with relational database (configured for PostgreSQL/SQLite)
- **Rationale**: Type-safe database access, automatic migrations, excellent TypeScript integration
- **Connection Pattern**: Singleton pattern with global caching in development to prevent connection exhaustion

**Data Models**:

1. **User**: Stores user profiles (id, username, createdAt)
2. **Repository**: Fake repositories for contributions (id, name, description, stars, readmeContent)
3. **Contribution**: Individual README edits (id, type, content, userId, repositoryId, createdAt)
4. **Badge**: Achievement definitions (id, name, description, icon, requirement)
5. **UserBadge**: Many-to-many relationship between users and badges (userId, badgeId, earnedAt)

**Relationships**:
- User → Contributions (one-to-many)
- User → Badges (many-to-many through UserBadge)
- Repository → Contributions (one-to-many)

**Seeding Strategy**: Database seeds with 10 fake repositories and 8 achievement badges for initial content

### External Dependencies

**UI Components**: shadcn/ui (Radix UI primitives)
- Accessible, customizable component library
- Components: Avatar, Badge, Button, Card, Input, Label
- Styling through Tailwind CSS with CSS variables for theming

**Form Handling**: 
- react-hook-form for client-side form management
- zod for schema validation
- @hookform/resolvers for integrating zod with react-hook-form

**Image Export**: html-to-image library
- Converts contribution cards to PNG images for social sharing
- Client-side only functionality

**Animation**: Framer Motion
- Provides smooth animations and transitions for UI elements

**Charts**: Recharts
- Data visualization library (likely for contribution graphs or statistics)

**Styling**:
- Tailwind CSS for utility-first styling
- tailwind-merge and clsx for conditional class merging
- tailwindcss-animate for animation utilities
- class-variance-authority for component variants

**Database**: Prisma Client (@prisma/client)
- Type-safe database access layer
- Migration and schema management

**No External APIs**: Application is self-contained with no third-party API integrations (GitHub, authentication providers, etc.)