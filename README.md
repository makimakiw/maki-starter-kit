# MVP Starter CLI

A complete Next.js MVP starter with design system, component library, and optional SpecKit integration for spec-driven development.

## What You Get

✅ **Next.js 15** with Tailwind CSS v4  
✅ **Design System** - 62+ design tokens (colors, spacing, typography)  
✅ **Component Library** - 5 production-ready components  
✅ **Pencil Integration** - Visual design system file generation  
✅ **SpecKit Support** - Optional spec-driven development workflow  
✅ **TypeScript** - Full type safety  

## Quick Start

### Prerequisites

- **Node.js 18+**
- **npm** (comes with Node.js)
- **Git**
- **Cursor IDE** (recommended)
- **Optional:** `uv` (for SpecKit - Python package manager)

### Installation

```bash
# Install the CLI globally
npm install -g .

# Or run directly with npx
npx . my-project-name
```

### Usage

```bash
# Run the interactive CLI
npx mvp-init

# Or if installed globally
mvp-init
```

The CLI will guide you through:
1. Project configuration (name, colors, preferences)
2. Next.js project creation
3. Design system setup
4. Pencil integration
5. Optional SpecKit installation (with automatic `uv` installation)
6. Complete step-by-step instructions (including Pencil setup)

## What Gets Created

```
my-project/
├── app/
│   ├── globals.css          # 62+ design tokens
│   ├── layout.tsx
│   └── page.tsx             # Component showcase
├── design-system/
│   ├── pencildraw/          # Component library
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── EmptyState.tsx
│   │   └── Placeholder.tsx
│   ├── CREATE-PENCIL-FILE.md
│   └── README.md
├── .specify/                # SpecKit (if chosen)
│   ├── memory/
│   └── templates/
├── package.json
├── tailwind.config.ts
└── next.config.ts
```

## Features

### Design System

- **62+ Design Tokens** organized by category:
  - Colors (primary, secondary, text, surfaces, states)
  - Spacing (consistent 4px scale)
  - Typography (5 font sizes)
  - Border radius (5 sizes)
  - Shadows (4 elevation levels)

### Component Library

5 production-ready components:
- **Button** - Multiple variants and sizes
- **Input** - With label, error, and helper text support
- **Modal** - Accessible dialog component
- **EmptyState** - For empty data states
- **Placeholder** - Loading states

### Pencil Integration

**Installation:** Pencil must be installed in Cursor's MCP settings first.

In Cursor:
1. Open Settings (⌘,)
2. Search for "MCP"
3. Enable Pencil MCP server

Then create visual design system files:
```
@CREATE-PENCIL-FILE.md please create the Pencil file
```

### SpecKit (Optional)

Spec-driven development workflow:
```
/speckit.constitution - Create project principles
/speckit.specify      - Define requirements
/speckit.plan         - Technical planning
/speckit.tasks        - Task breakdown
/speckit.implement    - Auto-implementation
```

## Installing SpecKit

**New in v1.2.0:** The CLI now offers to install `uv` automatically! 🎉

When you choose SpecKit, if `uv` is not installed, the CLI will ask:
```
? Install uv now? (y/N)
```

If you choose **Yes**, it installs automatically. If you prefer manual installation:

### macOS/Linux:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Windows:
```powershell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**Important:** After installing `uv`, restart your terminal and run the CLI again to complete SpecKit setup.

## Development

### Project Structure

```
mvp-starter-test/
├── bin/
│   └── cli.js           # Main CLI entry point
├── lib/
│   ├── check-prerequisites.js
│   ├── create-project.js
│   ├── extract-to-pencil.js
│   ├── generate-pen-file.js
│   ├── prompts.js
│   ├── setup-design-system.js
│   ├── setup-pencil.js
│   └── setup-speckit.js
├── scripts/
│   └── extract-components.js
└── package.json
```

### Testing Locally

```bash
# In this directory
npm test

# Or link globally
npm link
mvp-init
```

## Workflow

### Complete Flow

1. **Run CLI** → Answer prompts
2. **Open in Cursor** → `cursor .`
3. **Create Pencil File** → Use @CREATE-PENCIL-FILE.md
4. **Build Features:**
   - With SpecKit: Follow 5-step workflow
   - Without SpecKit: Build with Cursor Chat
5. **Run Dev Server** → `npm run dev`

### With SpecKit

```bash
# In Cursor Chat
/speckit.constitution Create principles for clean code and design system usage
/speckit.specify Build a user dashboard with profile editing
/speckit.plan Use the existing design system components
/speckit.tasks
/speckit.implement
```

### Without SpecKit

```bash
# In Cursor Chat
"Build a user dashboard using the Button, Input, and Modal components from the design system"
```

## Troubleshooting

### SpecKit Not Installing

**Issue:** `specify` command not found

**Solution:** Install `uv` first:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
# Restart terminal
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

### Pencil MCP Not Found

**Issue:** Pencil commands don't work in Cursor

**Solution:** Install Pencil MCP in Cursor settings

### Component Styles Not Working

**Issue:** Design tokens not applied

**Solution:** Make sure `app/globals.css` is imported in `layout.tsx`

## Documentation

- **[docs/INSTALLATION.md](docs/INSTALLATION.md)** - Detailed installation guide
- **[docs/STEP-BY-STEP-FLOW.md](docs/STEP-BY-STEP-FLOW.md)** - Complete workflow documentation
- **[docs/ERROR-FIXES.md](docs/ERROR-FIXES.md)** - Common errors and solutions
- **[docs/REAL-SPECKIT-INTEGRATION.md](docs/REAL-SPECKIT-INTEGRATION.md)** - SpecKit setup details
- **[docs/QUICK-START.md](docs/QUICK-START.md)** - Quick reference guide
- **[CHANGELOG.md](CHANGELOG.md)** - Version history

## Requirements

### Runtime:
- Node.js 18+
- npm 8+

### Optional:
- uv (for SpecKit)
- Python 3.11+ (for SpecKit)
- Cursor IDE (recommended)

## Version

**Current Version:** 2.0.0

**What's New in v2.0.0 (BREAKING CHANGES):**
- ✅ **Monorepo structure** - Parent folder with nested Next.js app
- ✅ **npm workspaces** - Scalable project structure
- ✅ **Root-level Git** - Repository at project root, not in app
- ✅ **Shared SpecKit** - `.specify/` folder at root for shared specs

**Structure:**
```
project-folder/            (git repo)
├── .git/
├── .specify/             (shared SpecKit)
├── package.json          (workspace config)
└── app-name/             (Next.js app)
    ├── app/
    ├── design-system/
    └── package.json
```

**Previous features:**
- ✅ Auto-constitution (v1.4.0)
- ✅ Pencil detection (v1.4.0)
- ✅ Professional Pencil files (v1.4.0)
- ✅ Terminal-based SpecKit (v1.4.0)
- ✅ Automatic uv installation (v1.2.0)
- ✅ Real GitHub SpecKit integration (v1.0.0)

## License

MIT

## Support

For issues, questions, or feature requests, please open an issue in the repository.

## Credits

Built with:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [SpecKit](https://github.com/github/spec-kit)
- [Pencil](https://pencil.so/)

---

**Start building your MVP today! 🚀**
