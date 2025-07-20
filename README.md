# Pageio - The Easiest Way To Create Your Mobile Website

## 📱 Project Overview

Pageio is a visual editor platform that enables easy creation of mobile-first websites through drag & drop functionality. It's designed to allow users to intuitively manipulate blocks to achieve their desired designs and layouts.

### Key Features

- **Drag & Drop Interface**: Intuitive block manipulation
- **Diverse Block Types**: Text, images, frames, sections
- **Advanced Styling**: Background, borders, shadows, typography

## 🛠 Technology Stack

### Frontend

- **TypeScript** - Type safety and improved development productivity
- **Next.js 15** - React-based full-stack framework
- **React 19** - Latest React features
- **Tailwind CSS** - Utility-first CSS framework

### Drag & Drop

- **react-dnd** - HTML5 drag and drop implementation

### UI/UX

- **Radix UI** - Accessible and customizable UI components
- **React Icons** - Various icon sets
- **Shadcn UI** - A set of beautifully-designed, accessible components and a code distribution platform.

### Database & Authentication

- **Supabase** - PostgreSQL-based backend SaaS
- **NextAuth.js** - Authentication system

### File Upload

- **AWS S3** - Image and file storage

## 📁 Project Structure

### App Router Structure (`src/app/`)

```
src/app/
├── (public)/           # Public pages
│   ├── p/[pageid]/     # Published page view
│   └── page.tsx        # Landing page
├── (private)/          # Authentication required pages
│   └── (auth)/         # Authenticated users only
│       ├── console/    # Admin console
│       └── page/       # Page editing
│           ├── [pageid]/       # Edit existing page
│           │   ├── page.tsx    # Editor page
│           │   └── preview/    # Preview page
│           └── new/            # Create new page
└── api/                # API routes
    ├── auth/           # Authentication API
    └── v1/             # Version 1 API
```

### Domain Layer (`src/domain/`)

#### Builder System (`src/domain/builder/`)

**Block System (`src/domain/builder/block/`)**

- `block.ts` - Base Block class definition
- `container.ts` - Container block (page root)
- `section/` - Section blocks (SECTION_CANVAS, SECTION_ROW, SECTION_COL)
- `frame/` - Frame blocks (FRAME_CANVAS, FRAME_ROW, FRAME_COL)
- `text.ts` - Text block
- `image.ts` - Image block
- `factory.ts` - Block creation and deserialization factory

**Mixin System (`src/domain/builder/mixin/`)**

- `children.ts` - Child element management
- `typography.ts` - Text styling
- `resize.ts` - Resize functionality
- `drag.ts` - Drag functionality
- `drop/` - Drop area management
- `snap/` - Snap functionality
- `background.ts` - Background styling
- `border.ts` - Border styling
- `shadow.ts` - Shadow effects
- `device.ts` - Device-specific settings

**History System**

- `history.ts` - Undo/redo functionality

### Components (`src/components/`)

#### Builder Components (`src/components/builder/`)

**Block Components (`src/components/builder/block/`)**
Each block type follows this structure:

```
block-type/
├── index.ts           # Component exports
├── component.tsx      # Main component
├── property.tsx       # Property panel
├── renderer.tsx       # Rendering logic
├── tree-node.tsx      # Tree view node
└── use-*.ts          # Custom hooks
```

**Property Panel (`src/components/builder/property/`)**

- `layout/` - Layout properties (size, alignment, spacing)
- `appearance/` - Appearance properties (background, border, shadow)
- `typography/` - Typography properties
- `image/` - Image properties
- `user-event/` - User event properties

**Tree & Layer (`src/components/builder/tree/`, `src/components/builder/layer/`)**

- Tree view components
- Drag and drop layers
- Snap lines

**Panel (`src/components/builder/panel/`)**

- Page metadata
- Publishing functionality
- Page name management

### Services (`src/service/`)

**Page Services (`src/service/pages/`)**

- Page CRUD operations
- Publish/unpublish functionality
- Block updates

**Image Services (`src/service/image/`)**

- Image upload
- S3 integration

### Shared Utilities (`src/shared/`)

**Database (`src/shared/database.ts`)**

- Supabase client configuration

**Auth (`src/shared/auth/`)**

- Authentication utilities

**Utils (`src/shared/util/`)**

- `color.ts` - Color processing
- `element.ts` - DOM element utilities
- `file.ts` - File handling
- `mixin.ts` - Mixin utilities
- `string.ts` - String processing
- `style.ts` - Style processing

### Hooks (`src/hooks/`)

- `use-block-history.tsx` - Block history management
- `use-copy-paste-block.ts` - Copy/paste functionality
- `use-default-block-drag.ts` - Default drag functionality
- `use-default-block-drop.ts` - Default drop functionality
- `use-domain.ts` - Domain state management
- `use-global-context.ts` - Global context
- `use-mobile.tsx` - Mobile detection
- `use-new-block.ts` - New block creation

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Type Generation (Supabase)

```bash
npm run type-gen
```

## 🔧 Environment Setup

1. Supabase project setup
2. AWS S3 bucket setup
3. Environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`
   - `AWS_S3_BUCKET_NAME`
