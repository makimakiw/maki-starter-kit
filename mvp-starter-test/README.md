# MVP Starter - Complete Package 🎉

## Production Ready! (v0.8.0) ✅

**Team-Ready CLI Tool** - Share with your coworkers!

Creates Next.js projects with:
- Complete design system (62+ tokens, 5 components)  
- **Optional** SpecKit workflow
- Pencil integration & component extraction
- .pen file generation
- **Pre-flight checks** for clean machine compatibility

### What This Chunk Does

- ✅ Gathers project configuration (name, colors, dark mode)
- ✅ Creates a real Next.js 15 project
- ✅ Installs all dependencies (React 19, Tailwind 4)
- ✅ Sets up TypeScript
- ✅ Creates design system with 62+ tokens
- ✅ Adds 5 core components (Button, Input, Modal, EmptyState, Placeholder)
- ✅ Configures globals.css with your brand color
- ✅ **NEW: Installs SpecKit framework**
- ✅ **NEW: Creates constitution with "Design System First" principle**
- ✅ **NEW: Adds spec/plan/task templates with design system integration**
- ✅ **NEW: Adds design system management commands**
- ✅ **NEW: Auto-opens browser when dev server starts**
- ✅ Sets up Pencil integration
- ✅ Creates Pencil documentation and workflow
- ✅ Extracts components automatically (Chunk 6)
- ✅ Generates extraction metadata (JSON + Markdown)
- ✅ Provides standalone extraction script
- ✅ Categorizes design tokens by type
- ✅ **NEW: Generates .pen file creation script** (Chunk 7!)
- ✅ **NEW: One-command Pencil file generation in Cursor**
- ✅ **NEW: Component placeholders with styling**
- ✅ **NEW: Design tokens as Pencil variables**
- ✅ Project is fully design-system, spec-driven, Pencil-ready, extraction-enabled, AND visually editable!

### How to Use

#### First Time Setup

1. **Check prerequisites:**
   ```bash
   node --version  # Should be v18+
   npm --version   # Should work
   ```

2. **Install dependencies:**
   ```bash
   cd "/Users/maxwroblewski/Test project/mvp-starter-test"
   npm install
   ```

3. **Run the CLI:**
   ```bash
   npm test
   ```

#### The CLI Will:

1. **Check your system** - Validates Node.js, npm, etc.
2. **Ask questions:**
   - Project name (e.g., `my-app`)
   - Primary color (default: #5749F4)
   - Dark mode support? (y/n)
   - Category colors? (y/n)
3. **Create the project** - Takes 2-3 minutes
4. **Extract components** - Automatic
5. **Ask about SpecKit:**
   - **Yes:** Full spec-driven workflow (team projects)
   - **No:** Skip it (solo work, quick prototypes)
6. **Ask to start dev server:**
   - **Yes:** Browser opens automatically
   - **No:** Shows manual instructions

**Total time:** 2-3 minutes ⚡

### Expected Output

```
🚀 MVP Starter Setup

Answer a few questions to get started...

? What is your project name? my-cool-app
? Primary brand color (hex)? █ #5749F4
? Include dark mode support? No
? Add category/domain colors? No

✅ Configuration complete!

Project Details:
  • Name:        my-cool-app
  • Color:       #5749F4
  • Dark Mode:   No

📦 Creating Next.js Project...

This will take 1-2 minutes (installing dependencies)...

[npm install output shown here...]

✔ Next.js project created!

🎨 Setting Up Design System...

✔ Design system set up successfully!

  Design system includes:
    • 62 design tokens (colors, spacing, typography)
    • 5 core components (Button, Input, Modal, EmptyState, Placeholder)
    • Documentation and best practices

📋 Setting Up SpecKit Framework...

✔ SpecKit framework installed
  ✓ Constitution created
  ✓ Spec/Plan/Task templates added
  ✓ Design System Initialization phase configured

🎉 Success! Your project is ready.

? Start the dev server now? Yes

🚀 Starting dev server...

[dev server output...]

🌐 Opening browser...

✓ Browser opened to http://localhost:3000
```

### Feedback Checklist

After testing, verify:

**Project Creation:**
- [ ] Did the project get created successfully?
- [ ] Did you get asked for project name?
- [ ] Did browser auto-open?
- [ ] Do components show immediately?

**Design System:**
- [ ] Can you see `design-system/pencildraw/` folder?
- [ ] Are the 5 components there (Button, Input, Modal, etc.)?
- [ ] Does `app/globals.css` have your color?
- [ ] Do components work in the browser?

**SpecKit:**
- [ ] Does `.specify/` directory exist?
- [ ] Does `.specify/memory/constitution.md` have 6 principles?
- [ ] Can you find "Principle 5: Design System First"?
- [ ] Are there 3 templates (spec, plan, tasks)?
- [ ] Are there 3 command files in `.specify/templates/commands/`?

**Pencil Integration:**
- [ ] Does `PENCIL-README.md` exist?
- [ ] Does `PENCIL-EXTRACTION.json` exist?
- [ ] Does `PENCIL-EXTRACTION.md` exist?
- [ ] Does extraction show 5 components?
- [ ] Does extraction show 62+ tokens?
- [ ] Does `CREATE-PENCIL-FILE.md` exist? (NEW!)
- [ ] Can you execute it in Cursor? (NEW!)

**Standalone Script:**
- [ ] Does `npm run extract` work? (NEW!)
- [ ] Can you re-run extraction? (NEW!)

**Issues:**
- [ ] Any errors during creation?
- [ ] Any confusing output?
- [ ] Any missing features?

### Current Capabilities

✅ **Complete Features:**
- Next.js 15 + React 19 + Tailwind 4
- Design system (62+ tokens, 5 components)
- SpecKit workflow integration
- Pencil documentation & setup
- Component extraction & metadata
- Standalone extraction script
- Browser auto-open
- Component showcase

⏳ **Future Enhancements:**
- Actual `.pen` file generation (requires Pencil MCP active connection)
- Live sync / watch mode
- Import from Pencil (reverse extraction)
- More component variants
- Theme switching in browser

## 📤 Sharing with Your Team

This CLI is ready to share with coworkers!

### Quick Distribution

**Option 1: Zip File**
```bash
cd "/Users/maxwroblewski/Test project"
zip -r mvp-starter-cli.zip mvp-starter-test -x "*/node_modules/*" -x "*/test-*"
```

Share the .zip via email/Slack/shared drive.

**Option 2: Git Repository**
```bash
cd mvp-starter-test
git init
git add .
git commit -m "MVP Starter CLI v0.8.0"
git remote add origin <your-repo-url>
git push -u origin main
```

Share the repository URL with your team.

### What to Send
- ✅ The CLI package (zip or Git URL)
- ✅ Link to `INSTALLATION.md` (setup guide)
- ✅ Link to `SHARING.md` (team guide)

### Their Setup (5 minutes)
1. Install Node.js v18+ (if needed)
2. Unzip or clone the CLI
3. Run `npm install`
4. Run `npm test`
5. Done!

**See `SHARING.md` for complete team distribution guide.**

---

## Additional Scripts

### Re-run Component Extraction

If you update components or tokens, re-extract:

```bash
cd your-project-name
npm run extract .
```

Or from the CLI folder:

```bash
npm run extract /path/to/your-project
```

### Sharing with Colleagues

To share this with your team:

1. **Copy the entire `mvp-starter-test` folder** to a Git repo
2. Tell them to run:
   ```bash
   npm install
   npm test
   ```
3. Done! They'll get the same setup.

Or publish to npm:
```bash
npm publish
```

Then they can run:
```bash
npx mvp-starter-test
```

## Documentation Files

**Chunk Completion Docs:**
- `CHUNK-4-COMPLETE.md` - SpecKit integration details
- `CHUNK-5-COMPLETE.md` - Pencil integration details
- `CHUNK-6-COMPLETE.md` - Component extraction details

**Testing Guides:**
- `TEST-CHUNK-4.md` - How to test SpecKit
- `TEST-CHUNK-5.md` - How to test Pencil
- `TEST-CHUNK-6.md` - How to test extraction

**Understanding:**
- `UNDERSTANDING-CHUNKS.md` - What each chunk does and why

**Read these for detailed information about features and implementation!**

---

**Next:** Chunk 5 will add Pencil Dev and MCP connection!
