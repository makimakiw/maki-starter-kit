# 🍣 MAKI-STARTER-KIT

> Beautiful Next.js projects in seconds

**MAKI-STARTER-KIT** is a delightful CLI that bootstraps complete Next.js projects with a professional design system, production-ready components, Pencil integration, and optional SpecKit workflow.

## ✨ What You Get

🎨 **Next.js 15** with Tailwind CSS v4  
🎯 **Design System** - 62+ design tokens (colors, spacing, typography, shadows)  
🧩 **Component Library** - 5 production-ready, beautifully styled components  
✏️ **Pencil Integration** - Visual design system file generation for Cursor  
📋 **SpecKit Support** - Optional spec-driven development workflow  
🔒 **TypeScript** - Full type safety out of the box  
⚡ **Monorepo Ready** - npm workspaces structure  
🎭 **Beautiful CLI** - Delightful terminal experience with gradients and animations  

## 🚀 Quick Start

### Prerequisites

- 💻 **Node.js 18+**
- 📦 **npm** (comes with Node.js)
- 🔗 **Git**
- ✨ **Cursor IDE** (recommended)
- 🐍 **Optional:** `uv` (for SpecKit - auto-installed if you choose SpecKit)

### Installation & Usage

**The simplest way - just 3 commands:**

```bash
git clone https://github.com/makimakiw/maki-starter-kit.git
cd maki-starter-kit
npm install && npm start
```

**That's it!** MAKI will launch immediately! 🍣

---

**Detailed Steps (if you prefer):**

```bash
# Step 1: Clone the repository
git clone https://github.com/makimakiw/maki-starter-kit.git

# Step 2: Navigate into the project directory
cd maki-starter-kit

# Step 3: Install dependencies
npm install

# Step 4: Run MAKI!
npm start
```

---

**Want to use `maki-init` command globally?**

```bash
# After installation, link it globally once:
npm link

# Now you can use 'maki-init' from anywhere!
maki-init
```

**MAKI will guide you through:**
1. 🎯 Project configuration (names, colors, preferences)
2. 📦 Next.js monorepo creation with npm workspaces
3. 🎨 Design system setup with 62+ tokens
4. 🧩 Component library installation
5. ✏️ Pencil integration and file generation
6. 📋 Optional SpecKit installation (with automatic `uv` setup)
7. ✨ Complete step-by-step instructions

**Everything is interactive, beautiful, and fast!**

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

## ✨ Features

### 🎨 Professional Design System

**62+ Design Tokens** organized by category:
- 🌈 **Colors** - Primary, secondary, text, surfaces, states
- 📏 **Spacing** - Consistent 4px scale (xs to 3xl)
- 📝 **Typography** - 5 font sizes with proper line heights
- 🔲 **Border Radius** - 5 sizes (sm to 2xl)
- ✨ **Shadows** - 4 elevation levels

All tokens use CSS custom properties and are Tailwind CSS v4 compatible!

### 🧩 Beautiful Component Library

**5 production-ready components:**
- 🔘 **Button** - Multiple variants (primary, secondary, ghost) and sizes
- 📝 **Input** - With label, error, and helper text support
- 🪟 **Modal** - Fully accessible dialog component with backdrop
- 📭 **EmptyState** - For empty data states with customizable messages
- ⏳ **Placeholder** - Skeleton loading states

All components use your design system tokens automatically!

### ✏️ Pencil Integration

**MAKI generates CREATE-PENCIL-FILE.md automatically!**

After installing Pencil MCP in Cursor:
1. ⚙️  Open Settings (⌘,)
2. 🔍 Search for "MCP"
3. ✅ Enable Pencil MCP server
4. 🔄 Restart Cursor

Then create your visual design system:
```
@app-name/design-system/CREATE-PENCIL-FILE.md create the Pencil file
```

MAKI will detect if Pencil is installed and show you exactly what to do!

### 📋 SpecKit (Optional)

**Spec-driven development workflow with auto-constitution!**
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

## 🎉 Version

**Current Version:** 🍣 **3.2.0 - MAKI** 🍣

### 🔧 What's New in v3.2.0 (CRITICAL FIX!)

**Fixed Pencil Variables:**
- ✅ **Variables work properly** - No more hardcoded colors!
- ✅ **Proper MCP syntax** - Uses correct Pencil operations format
- ✅ **Dynamic design system** - Change one variable, update everything
- ✅ **Test instructions** - Verify variables work by changing primary color

**Problem in v3.1.0:** Components had hardcoded colors instead of variable references.  
**Solution:** Complete rewrite using proper `set_variables` and `batch_design` tool syntax.

**Now when you change `$colors.primary`, all primary buttons update instantly!** 🎨

### ✨ What's New in v3.0.0 (MAJOR UPDATE!)

**🎨 Beautiful CLI Experience:**
- ✨ **Gradient ASCII art banner** - Welcome to MAKI!
- 📦 **Boxed messages** - Clean, organized terminal output
- 🌈 **Colorful spinners** - Beautiful loading animations
- 🎭 **Fun emoji** - Delightful user experience throughout

**🔄 Complete Rebrand:**
- 🍣 **New name:** MAKI-STARTER-KIT (was mvp-starter-cli)
- 🚀 **New command:** `maki-init` (was mvp-init)
- 📦 **New package name:** maki-starter-kit
- ✨ **Professional polish** - Every message improved

**📦 New Dependencies:**
- `figlet` - ASCII art banners
- `gradient-string` - Beautiful gradient text
- `boxen` - Boxed terminal messages
- `nanospinner` - Enhanced loading spinners

### 🏗️ Previous Major Features

**v2.0.3:**
- ✅ Always generates CREATE-PENCIL-FILE.md
- ✅ Fixed MCP detection (no hardcoded paths)
- ✅ Shows exact file location and @reference path

**v2.0.0:**
- ✅ Monorepo structure with npm workspaces
- ✅ Root-level Git repository
- ✅ Shared SpecKit at project root

**v1.4.0:**
- ✅ Auto-constitution for SpecKit
- ✅ Pencil MCP detection
- ✅ Professional Pencil file generation
- ✅ Terminal-based SpecKit commands

**Monorepo Structure:**
```
your-project/              (git repo)
├── .git/
├── .specify/              (shared SpecKit)
├── package.json           (workspace config)
└── your-app/              (Next.js app)
    ├── app/
    ├── design-system/
    │   └── CREATE-PENCIL-FILE.md  ← Always created!
    └── package.json
```

## 🔧 Troubleshooting

### Error: "ENOENT: no such file or directory, open 'package.json'"

**Cause:** You're not in the maki-starter-kit directory.

**Solution:**
```bash
# Check where you are
pwd

# Navigate to the correct directory
cd maki-starter-kit

# Verify package.json exists
ls package.json

# Now try again
npm install
```

### Error: "cd: maki-starter-kit: No such file or directory"

**Cause:** The repository wasn't cloned successfully, or you're not in the parent directory.

**Solution:**
```bash
# Check if the directory exists
ls | grep maki

# If you don't see maki-starter-kit, clone again
git clone https://github.com/makimakiw/maki-starter-kit.git

# Then navigate into it
cd maki-starter-kit
```

### Error: "Command not found: maki-init"

**Cause:** The `maki-init` command isn't linked globally yet.

**Solution:**
```bash
# Option 1: Use npm start (simplest!)
cd maki-starter-kit
npm start

# Option 2: Link globally to use 'maki-init' anywhere
cd maki-starter-kit
npm link
maki-init
```

### Installation Checklist

If you're having issues, verify each step:

- [ ] Cloned the repository: `git clone https://github.com/makimakiw/maki-starter-kit.git`
- [ ] Changed into directory: `cd maki-starter-kit`
- [ ] Installed dependencies: `npm install` (should complete without errors)
- [ ] Run MAKI: `npm start`

---

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
