# FocusFlow AI - Architecture Document

## System Architecture

### Frontend Architecture

- Next.js 14 (App Router)
- React with TypeScript
- Tailwind CSS + shadcn/ui
- Zustand for state management
- React Query for data fetching

### Backend Architecture

- Next.js API Routes
- Prisma ORM
- PostgreSQL Database
- OpenAI API Integration
- Redis for caching

### Data Model

````prisma
model User {
  id        String   @id @default(cuid())
  tasks     Task[]
  settings  Json?
}

model Task {
  id          String   @id @default(cuid())
  content     String
  category    String?
  priority    Int      @default(0)
  completed   Boolean  @default(false)
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

I'll proceed with creating the architecture document since you've approved the PRD. Let me create the technical architecture specification:

```markdown:/Users/dawid/Projects/pastel-todo-breeze/.ai/arch.md
# FocusFlow AI - Architecture Document

## Monorepo Structure
```

### Frontend Architecture
- Next.js 14 (App Router)
- React with TypeScript
- Tailwind CSS + shadcn/ui
- Zustand for state management
- React Query for data fetching

### Backend Architecture
- Next.js API Routes
- Prisma ORM
- PostgreSQL Database
- OpenAI API Integration
- Redis for caching

### Data Model
```prisma
model User {
  id        String   @id @default(cuid())
  tasks     Task[]
  settings  Json?
}

model Task {
  id          String   @id @default(cuid())
  content     String
  category    String?
  priority    Int      @default(0)
  completed   Boolean  @default(false)
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
````

### API Endpoints

- `/api/tasks` - Task CRUD operations
- `/api/ai/process` - AI task processing
- `/api/ai/suggest` - AI suggestions
- `/api/user` - User management

### Directory Structure

```
src/
├── app/
├── components/
├── lib/
├── styles/
└── types/
```

## Change Log

- Updated to monorepo architecture
- Added shared packages structure
- Configured Turborepo setup
