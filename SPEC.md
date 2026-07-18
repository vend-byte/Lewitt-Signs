# Lewitt Signs - Enterprise Printing & Branding Platform

## 1. Concept & Vision

Lewitt Signs is a premium printing and branding company requiring an enterprise-grade web presence with a complete CMS/Admin Dashboard. The platform embodies modern luxury design with dark aesthetics, glassmorphism accents, and seamless animations. Every aspect is dynamically managed through the admin dashboard—no hardcoded content.

The experience should feel like Apple's product pages meets Stripe's dashboard sophistication. Premium, trustworthy, and effortlessly professional.

## 2. Design Language

### Aesthetic Direction
Modern luxury dark theme inspired by Apple, Stripe, and Framer. Clean lines, generous whitespace, and subtle depth through glassmorphism where appropriate.

### Color Palette
- **Background**: `#0B0F19` (deep navy-black)
- **Cards**: `#1E293B` (slate blue-gray)
- **Primary Accent**: `#00F0FF` (electric cyan)
- **Primary CTA**: `#E4FF00` (bright lime)
- **WhatsApp**: `#25D366` (brand green)
- **White Text**: `#FFFFFF`
- **Secondary Text**: `#94A3B8` (muted slate)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold, tracking tight
- **Body**: Regular, 1.6 line-height
- **Monospace**: For code/data displays

### Spatial System
- Base unit: 4px
- Section padding: 80px-120px vertical
- Container max-width: 1280px
- Card padding: 24px-32px
- Border radius: 12px (cards), 8px (buttons), 16px (modals)

### Motion Philosophy
- All transitions: 200ms ease
- Hover effects: scale(1.02), shadow lift
- Page transitions: fade + subtle slide
- Loading states: skeleton shimmer
- Staggered animations for lists

## 3. Layout & Structure

### Client Website
- **Navigation**: Sticky header with blur backdrop
- **Hero**: Full-viewport with video/image background support
- **Sections**: Alternating layouts with dynamic content
- **Footer**: Multi-column with newsletter signup

### Admin Dashboard
- **Sidebar**: Collapsible, icon + text navigation
- **Main Content**: Card-based layouts
- **Header**: Breadcrumbs, search, user menu
- **Responsive**: Sidebar collapses on mobile

### Pages
1. Home - Hero, Services preview, Portfolio highlights, Testimonials, CTA
2. About - Mission, Vision, Story, Stats, Team
3. Services - Grid of all services with details
4. Portfolio - Filterable gallery with lightbox
5. Pricing - Dynamic pricing cards
6. Testimonials - Carousel of client reviews
7. Blog - Article listing with featured posts
8. FAQ - Accordion-style questions
9. Contact - Form, map, contact details
10. Get Quote - Multi-step form

## 4. Features & Interactions

### Public Website
- Dynamic content from Neon database
- Real-time language switching
- WhatsApp floating button with pulse animation
- Smooth scroll navigation
- Image lazy loading with blur placeholders
- Lightbox gallery for portfolio
- Contact form with validation
- Quote request form with file upload

### Admin Dashboard
- Secure authentication with Auth.js
- Role-based access (Super Admin, Admin, Editor)
- Drag-and-drop content ordering
- Rich text editor for blog
- Media library with Cloudinary integration
- Real-time analytics charts
- Settings management
- Backup system
- Activity logs

### Interactions
- **Hover**: Scale 1.02, shadow elevation
- **Click**: Ripple effect, 200ms transition
- **Form Submit**: Loading state, success/error feedback
- **Delete**: Confirmation modal
- **Error**: Toast notifications

## 5. Component Inventory

### Navigation
- Desktop: Logo, nav links, CTA button
- Mobile: Hamburger, slide-in menu with backdrop blur
- States: Default, hover (cyan underline), active (filled)

### Hero Section
- Full-viewport container
- Overlay with gradient
- Animated text entry
- Dual CTA buttons
- Optional video background

### Service Cards
- Icon, title, description
- Hover: lift + glow effect
- States: Default, hover, loading skeleton

### Portfolio Grid
- Masonry/grid layout
- Filter tabs by category
- Lightbox on click
- Featured badge

### Testimonial Carousel
- Auto-play with pause on hover
- Client photo, quote, rating stars
- Dot navigation

### Blog Cards
- Featured image
- Category badge
- Title, excerpt, date
- Read more link

### FAQ Accordion
- Animated expand/collapse
- Icon rotation
- Smooth height transition

### Forms
- Floating labels
- Inline validation
- Multi-step support
- File upload with preview

### Admin Components
- Data tables with sorting/filtering
- Sidebar navigation
- Stat cards with charts
- Modal dialogs
- Toast notifications

## 6. Technical Approach

### Frontend Architecture
```
src/
├── app/
│   ├── (client)/           # Public pages
│   │   ├── page.tsx        # Home
│   │   ├── about/
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── pricing/
│   │   ├── testimonials/
│   │   ├── blog/
│   │   ├── faq/
│   │   ├── contact/
│   │   └── quote/
│   ├── (admin)/            # Admin dashboard
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   ├── landing/
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── media/
│   │   ├── pricing/
│   │   ├── testimonials/
│   │   ├── faq/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── quotes/
│   │   ├── analytics/
│   │   ├── users/
│   │   ├── settings/
│   │   ├── security/
│   │   ├── backups/
│   │   └── logs/
│   ├── api/                # API routes
│   └── auth/               # Auth.js config
├── components/
│   ├── ui/                 # Shadcn components
│   ├── client/             # Public components
│   └── admin/              # Admin components
├── lib/
│   ├── db.ts               # Prisma client
│   ├── cloudinary.ts       # Cloudinary config
│   ├── auth.ts             # Auth.js config
│   └── utils.ts
├── actions/                # Server actions
└── types/                  # TypeScript types
```

### Database Schema (Prisma)

**Core Models:**
- `User` - id, email, password, name, role, avatar, lastLogin, createdAt, updatedAt, deletedAt
- `Role` - id, name, permissions, createdAt
- `Setting` - id, key, value, group, createdAt, updatedAt
- `Service` - id, title, description, icon, image, order, status, createdAt, updatedAt, deletedAt
- `Portfolio` - id, title, description, category, featured, order, createdAt, updatedAt, deletedAt
- `PortfolioImage` - id, portfolioId, url, publicId, width, height, alt, createdAt
- `Media` - id, url, publicId, width, height, format, bytes, folder, createdAt
- `Blog` - id, title, slug, content, excerpt, featuredImage, status, publishedAt, authorId, createdAt, updatedAt, deletedAt
- `Category` - id, name, slug, createdAt
- `PricingPlan` - id, name, description, price, features, order, status, createdAt, updatedAt, deletedAt
- `Testimonial` - id, clientName, company, position, photo, review, rating, order, createdAt, updatedAt, deletedAt
- `FAQ` - id, question, answer, order, status, createdAt, updatedAt, deletedAt
- `QuoteRequest` - id, fullName, phone, email, businessName, serviceId, budget, deadline, description, attachments, status, createdAt, updatedAt
- `Contact` - id, type, value, order, createdAt, updatedAt
- `Language` - id, code, name, nativeName, direction, status, default, createdAt
- `Translation` - id, languageId, key, value, createdAt, updatedAt
- `SystemLog` - id, userId, action, details, ipAddress, createdAt

### API Design

**Server Actions (CRUD):**
- `createService`, `updateService`, `deleteService`, `getServices`, `reorderServices`
- `createPortfolio`, `updatePortfolio`, `deletePortfolio`, `getPortfolioItems`
- `createBlog`, `updateBlog`, `deleteBlog`, `getBlogs`, `publishBlog`
- `createQuoteRequest`, `getQuoteRequests`, `updateQuoteStatus`
- `uploadMedia`, `deleteMedia`, `getMediaLibrary`
- `updateSettings`, `getSettings`, `exportSettings`
- `createBackup`, `restoreBackup`, `getBackups`

**API Routes:**
- `/api/auth/[...nextauth]` - Authentication
- `/api/upload` - Cloudinary upload
- `/api/analytics` - Analytics data

### Authentication
- Auth.js with credentials provider
- JWT sessions
- Role-based middleware
- 2FA support ready
- Session timeout: 24 hours

### Image Storage
- Cloudinary for all media
- Auto-optimization
- Responsive breakpoints
- Lazy loading

### Security
- CSRF protection
- XSS prevention
- SQL injection prevention
- Rate limiting
- Input sanitization
- Secure headers

## 7. Performance Targets

- Lighthouse Score: 95+
- First Contentful Paint: <1s
- Largest Contentful Paint: <2s
- Time to Interactive: <3s
- Cumulative Layout Shift: <0.1

### Optimizations
- Next.js Image component
- Dynamic imports
- Code splitting
- Server components
- Skeleton loaders
- Prefetch on hover
