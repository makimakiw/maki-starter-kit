# ✅ Step-by-Step Flow - Complete Instructions

## What Changed in v1.0.0

### The Problem:
**Before:** Dev server started BEFORE showing next steps, blocking the terminal so users couldn't follow SpecKit workflow or create Pencil files.

### The Solution:
**After:** Complete ALL setup first, show COMPLETE step-by-step instructions, THEN optionally start dev server.

## New CLI Flow

### Phase 1: Setup (Automated)
1. ✅ Check prerequisites (Node.js, npm, git)
2. ✅ Gather project info (name, colors, preferences)
3. ✅ Create Next.js project
4. ✅ Install design system (62+ tokens, 5 components)
5. ✅ Set up Pencil integration
6. ✅ Extract components to Pencil format
7. ✅ Optionally install SpecKit (if user chooses)

### Phase 2: Instructions (Detailed)
**After ALL setup is complete**, the CLI shows COMPLETE step-by-step instructions:

```
======================================================================
📋 STEP-BY-STEP INSTRUCTIONS
======================================================================

✅ What Was Created:
  • Next.js project with Tailwind CSS v4
  • Design system with 62+ tokens in app/globals.css
  • 5 components: Button, Input, Modal, EmptyState, Placeholder
  • Pencil integration files
  • Component extraction metadata
  • SpecKit framework (.specify/ folder) [if chosen]

📍 Step 1: Navigate to Your Project
   cd your-project-name

📍 Step 2: Open in Cursor
   cursor .

📍 Step 3: Create Pencil Design File
   In Cursor Chat, paste this EXACT command:
   
   @CREATE-PENCIL-FILE.md please create the Pencil file
   
   This will create a visual design system file with all components

📍 Step 4: Start SpecKit Workflow (Optional but Recommended)
   SpecKit helps you build with a structured spec → plan → implement flow.

   Step 4a: Create Project Constitution
   In Cursor Chat, paste:
   
   /speckit.constitution Create principles focused on design system usage, clean code, and user experience
   
   This creates your project's governing principles

   Step 4b: Define What to Build
   In Cursor Chat, paste:
   
   /speckit.specify Build [describe your MVP here, e.g., "a user dashboard with profile editing"]
   
   Be specific about what you want to build

   Step 4c: Create Technical Plan
   In Cursor Chat, paste:
   
   /speckit.plan Use the existing design system components, Next.js, and Tailwind CSS
   
   This creates a detailed implementation plan

   Step 4d: Generate Tasks
   In Cursor Chat, paste:
   
   /speckit.tasks
   
   This breaks down the plan into actionable tasks

   Step 4e: Implement
   In Cursor Chat, paste:
   
   /speckit.implement
   
   This executes all tasks and builds your feature

📍 Final Step: Run Dev Server
   When ready to see your app:
   npm run dev
   Opens at http://localhost:3000

💡 Pro Tips:
   • All design tokens are in app/globals.css
   • Components are in design-system/pencildraw/
   • Use @filename.md to reference files in Cursor
   • SpecKit files are in .specify/ folder
   • Each SpecKit command creates new files in specs/

======================================================================
```

### Phase 3: Dev Server (Optional)
**After showing all instructions**, the CLI asks:
```
? Start the dev server now (this will block the terminal)? (y/N)
```

Default is **No** so users can:
1. Review the instructions
2. Follow steps in Cursor
3. Start dev server when THEY'RE ready

## Key Benefits

### 1. No Terminal Blocking
✅ Users can copy-paste commands from instructions
✅ No confusion about what to do while server is running
✅ Terminal stays free for reviewing output

### 2. Complete Instructions First
✅ ALL steps shown before dev server
✅ Users know exactly what to do
✅ Can reference instructions anytime
✅ Nothing is hidden or shown "later"

### 3. Copy-Paste Ready
✅ Exact commands with blue background
✅ No typos or guessing
✅ Works for both SpecKit and non-SpecKit users

### 4. Clear Workflow Phases
```
Setup (CLI) → Instructions (CLI) → Work in Cursor → Dev Server (Manual)
```

## Example Session

### With SpecKit:

```bash
$ npm test

# ... setup happens ...

📋 STEP-BY-STEP INSTRUCTIONS
[Shows complete instructions including SpecKit workflow]

? Start the dev server now (this will block the terminal)? No

# User can now:
$ cd my-project
$ cursor .
# Follow steps in Cursor
# When ready:
$ npm run dev
```

### Without SpecKit:

```bash
$ npm test

# ... setup happens ...

📋 STEP-BY-STEP INSTRUCTIONS
[Shows complete instructions without SpecKit workflow]

? Start the dev server now (this will block the terminal)? No

# User can now:
$ cd my-project
$ cursor .
# Build features with design system
# When ready:
$ npm run dev
```

## What Each Step Does

### Step 1: Navigate to Project
Simple `cd` command - gets you into project directory

### Step 2: Open in Cursor
`cursor .` opens project in Cursor IDE

### Step 3: Create Pencil File
`@CREATE-PENCIL-FILE.md please create the Pencil file`
- Uses Pencil MCP tools
- Creates visual design system file
- Adds all component placeholders
- Sets up design tokens as variables
- Ready for visual editing

### Step 4 (SpecKit): Spec-Driven Development

#### 4a: Constitution
`/speckit.constitution Create principles...`
- Creates `.specify/memory/constitution.md`
- Defines project principles
- Sets development guidelines

#### 4b: Specify
`/speckit.specify Build [your feature]`
- Creates `specs/XXX-feature-name/spec.md`
- Documents requirements
- Creates user stories
- Maps to design system components

#### 4c: Plan
`/speckit.plan Use the existing...`
- Creates `specs/XXX-feature-name/plan.md`
- Technical architecture
- Component selection
- Implementation approach

#### 4d: Tasks
`/speckit.tasks`
- Creates `specs/XXX-feature-name/tasks.md`
- Breaks plan into actionable tasks
- Orders tasks by dependency
- Marks parallel execution opportunities

#### 4e: Implement
`/speckit.implement`
- Executes all tasks from tasks.md
- Creates files and components
- Follows design system patterns
- Builds working feature

### Final Step: Dev Server
`npm run dev`
- Starts Next.js development server
- Opens browser at localhost:3000
- Hot reload enabled
- See your app live

## Files Created

```
my-project/
├── .specify/                      # SpecKit (if chosen)
│   ├── memory/
│   │   └── constitution.md        # Project principles
│   ├── scripts/
│   │   ├── check-prerequisites.sh
│   │   ├── create-new-feature.sh
│   │   └── setup-plan.sh
│   └── templates/
│       ├── spec-template.md
│       ├── plan-template.md
│       └── tasks-template.md
├── specs/                         # Created by SpecKit workflow
│   └── 001-feature-name/
│       ├── spec.md
│       ├── plan.md
│       └── tasks.md
├── app/
│   ├── globals.css               # 62+ design tokens
│   ├── layout.tsx
│   └── page.tsx
├── design-system/
│   ├── pencildraw/               # Component library
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Placeholder.tsx
│   │   └── index.tsx
│   ├── PENCIL-EXTRACTION.json    # Component metadata
│   ├── PENCIL-EXTRACTION.md      # Documentation
│   └── CREATE-PENCIL-FILE.md     # Pencil generator
├── AGENTS.md                      # SpecKit agent config
├── package.json
├── tailwind.config.ts
└── next.config.ts
```

## Terminal Output Colors

- 🟦 **Blue Background** = Copy-paste commands
- 🟨 **Yellow** = Important warnings or headings
- 🟩 **Green** = Success messages
- 🔵 **Cyan** = Commands to run in terminal
- ⚫ **Dim** = Explanatory notes

## Common Workflows

### Workflow 1: Full SpecKit (Recommended for Teams)
1. Run CLI, choose SpecKit
2. Follow all SpecKit steps (constitution → specify → plan → tasks → implement)
3. Create Pencil file for visual editing
4. Start dev server
5. Iterate with more specs

### Workflow 2: Quick MVP (Solo Projects)
1. Run CLI, skip SpecKit
2. Create Pencil file
3. Ask Cursor to build features using design system
4. Start dev server
5. Iterate quickly

### Workflow 3: Design-First
1. Run CLI (SpecKit optional)
2. Create Pencil file FIRST
3. Design visually in Pencil
4. Export designs
5. Build with Cursor
6. Start dev server

## Troubleshooting

### Q: Can I start dev server later?
**A:** Yes! Just `cd your-project && npm run dev`

### Q: What if I missed the instructions?
**A:** Scroll up in terminal or check this file

### Q: Can I run SpecKit commands multiple times?
**A:** Yes! Each creates a new feature branch/spec

### Q: Do I have to follow the exact order?
**A:** SpecKit: Yes, order matters. Non-SpecKit: No, build freely

### Q: What if Pencil file creation fails?
**A:** See `design-system/CREATE-PENCIL-FILE.md` for troubleshooting

## Version History

- **v1.0.0** - Step-by-step flow, complete instructions before dev server
- **v0.9.0** - Dev server started first (problematic)
- **v0.8.x** - Basic MVP functionality

---

*Documentation updated: 2026-01-27*
