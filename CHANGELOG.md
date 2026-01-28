# Changelog

All notable changes to this project will be documented in this file.

## [3.2.2] - 2026-01-28 - 🐛 Fixed CREATE-PENCIL-FILE.md Generation

### Bug Fix: File Creation More Robust

**Problem:** CREATE-PENCIL-FILE.md was not being created reliably, even though the CLI said it was.

**Root Cause:** 
- No explicit directory existence check before writing
- No verification that file was actually created
- Error handling was swallowing failures
- Insufficient error logging

**Solution:**
- ✅ Added explicit `fs.ensureDir()` before file write
- ✅ Added file existence verification after write
- ✅ Better error handling with full stack traces
- ✅ Added full file path to console output for debugging
- ✅ Check return value from `generatePenFile()` before proceeding

**Changes:**
- `lib/generate-pen-file.js`: 
  - Ensure design-system directory exists
  - Verify file was created
  - Better error logging with stack trace
  - Show full file path in console
- `lib/extract-to-pencil.js`:
  - Check return value from generatePenFile
  - Display error if file generation failed

**Impact:**
Users will now see clear errors if file creation fails, and the file creation is more robust with directory checks.

## [3.2.1] - 2026-01-28 - 🧹 Repository Cleanup

### 🗑️ Removed Unnecessary Files

**What was removed:**
- All version-specific documentation files (V*.md)
- Development documentation (docs/ folder)
- Unused scripts folder
- Cursor development files (.cursor/ folder)
- Temporary test files (CLEANUP-SUMMARY.md, GIT-SETUP.md, etc.)

**What remains (lean & essential):**
- ✅ `bin/` - CLI entry point
- ✅ `lib/` - Core CLI logic (9 modules)
- ✅ `package.json` - Package configuration
- ✅ `package-lock.json` - Dependency lock
- ✅ `README.md` - Main documentation
- ✅ `CHANGELOG.md` - Version history
- ✅ `.gitignore` - Git ignore rules

**Result:** Clean, production-ready repository with only essential files!

**Files changed:**
- Removed 20+ documentation files
- Package size reduced significantly
- Easier to navigate and maintain

## [3.2.0] - 2026-01-28 - 🔧 Fixed Pencil Variables (CRITICAL!)

### 🐛 Critical Fix: Pencil Now Uses Variables (Not Hardcoded!)

**Problem Found:** v3.1.0 Pencil generation showed conceptual component structure but didn't include proper Pencil MCP tool syntax. Components ended up with hardcoded colors instead of variable references.

**Root Cause:** Instructions showed "desired structure" but not actual Pencil operations syntax with `I()`, variable references, or proper tool calls.

**Solution:** Complete rewrite using proper Pencil MCP `batch_design` operations.

**What Changed:**
- ✅ **Step-by-step tool calls:** `open_document` → `set_variables` → `batch_design`
- ✅ **Variables FIRST:** Explicitly create all design tokens before components
- ✅ **Proper operations syntax:** Using `I("canvas", {...})` Pencil syntax
- ✅ **Correct variable references:** All colors use `"$colors.primary"` with quotes
- ✅ **Test instructions:** Added critical test to verify variables work by changing primary color

**Variable Syntax (FIXED):**
```javascript
// CORRECT (what we generate now):
fill: "$colors.primary"       // Updates when variable changes!

// WRONG (what happened in v3.1.0):
backgroundColor: $color-primary  // Not proper Pencil syntax
fill: "#3B82F6"                  // Hardcoded value
```

**Components Now Use Pencil Operations:**
```javascript
btnPrimary=I("canvas", {
  type: "frame",
  name: "Button Primary",
  x: 100,
  y: 120,
  width: 180,
  height: 44,
  fill: "$colors.primary",      // ← Variable reference!
  cornerRadius: "$radii.pill",  // ← Variable reference!
  padding: { left: "$spacing.6", right: "$spacing.6" }  // ← Variables!
})
```

**Visual Adjustments Still Applied:**
- Button text: 17px with -0.2 letter-spacing, font-weight 500
- Button heights: 44px (default) and 50px (large)
- Input fields: 44px with 15px labels, 13px helper text
- All browser-matching specifications maintained

**Verification Added:**
Instructions now include test: "Change $colors.primary value - all primary buttons should update!"

**Impact:**
- Variables now work properly in Pencil
- Design system is truly dynamic
- Users can change colors and see instant updates
- No more hardcoded values

**Files Changed:**
- `lib/generate-pen-file.js` - Rewritten with proper Pencil MCP syntax
- `package.json` - Version 3.2.0
- `CHANGELOG.md` - This entry

## [3.1.0] - 2026-01-28 - 🎨 Professional Pencil Generation

### ✨ Major Pencil Quality Upgrade

**Complete rewrite of Pencil file generation for browser-matching visuals:**

**Visual Adjustments for Browser Parity:**
- Button text: 17px (not 16px) with letter-spacing -0.2 and font-weight 500
- Button heights: 44px (default) and 50px (large) - compensated for visual balance
- Input fields: 44px tall with 16px text size
- Input labels: 15px, font-weight 500
- Helper text: 13px
- All measurements precisely match browser rendering

**Reusable Components Structure:**
- Button-Primary, Button-Secondary, Button-Outline, Button-Large
- Input-Default, Input-Error (with labels and helper text)
- Modal (with shadow-xl for depth)
- EmptyState (centered layout with emoji)
- Placeholder-Square, Placeholder-Video (with dashed borders)

**Complete Showcase Page:**
- Header section with title and description
- Buttons section (all variants in rows)
- Inputs section (4 examples: default, error, with helper)
- Modal section
- Empty State section (with dashed container)
- Placeholders section (grid of aspect ratios)
- Design Tokens section (color swatches)

**All Design Tokens:**
- 62+ variables (colors, spacing, typography, radii, shadows)
- Referenced with $ prefix throughout
- Proper categorization

**Better Structure:**
- Reusable components (reusable: true)
- Component instances for showcase
- Proper text growth ("auto" for buttons, "fixed-width" for body)
- Flexbox layouts with proper alignment
- Visual verification checklist

### 🎯 Why This Matters
Previous Pencil generation was basic. New generation creates production-ready, 
visually accurate components that match the browser rendering perfectly.

### 📦 Files Changed
- `lib/generate-pen-file.js` - Complete rewrite (~1300 lines)
- `package.json` - Version 3.1.0

## [3.0.2] - 2026-01-28 - ⚡ Simplified Usage

### 🚀 Major Simplification
- **One command to run:** Changed from complex `npm link` + `maki-init` workflow to simple `npm start`
- **Out-of-the-box usage:** Works immediately after `npm install` - no additional setup required
- **Clearer instructions:** Reduced installation to just 3 commands total

### 📝 Updated Documentation
- **README.md:** Simplified installation section, now shows `npm start` as primary method
- **All guides:** Updated troubleshooting, colleague messages, and examples to use `npm start`
- **Global command:** Made `npm link` optional for users who want the global `maki-init` command

### 🎯 Why This Matters
Users were confused by "command not found: maki-init" after installation. Now it just works:
```bash
git clone https://github.com/makimakiw/maki-starter-kit.git
cd maki-starter-kit
npm install && npm start  # ← Launches immediately!
```

### 📦 Files Changed
- `README.md` - Simplified installation and usage sections
- `MAKI-IMPLEMENTATION-COMPLETE.md` - Updated colleague messages
- `V3.0.1-INSTALLATION-FIX.md` - Updated examples
- `CHANGELOG.md` - This entry
- `package.json` - Version bump to 3.0.2

## [3.0.1] - 2026-01-28 - 📝 Installation Instructions Update

### 🔧 Fixed
- **Clearer installation steps** - Added explicit numbered steps to prevent directory navigation errors
- **Verification steps** - Added `ls package.json` check to ensure users are in correct directory
- **Warning messages** - Added clear warnings about following steps in order
- **Quick install option** - Added one-liner command for experienced users

### 📚 Documentation Improvements
- **Troubleshooting section** - Added comprehensive troubleshooting guide in README
- **Error solutions** - Documented common errors (ENOENT, command not found, cd errors)
- **Installation checklist** - Added step-by-step verification checklist
- **Updated colleague messages** - Fixed repo URLs and improved clarity in all documentation

### 🔗 Updated Files
- `README.md` - Better installation section, new troubleshooting section
- `MAKI-IMPLEMENTATION-COMPLETE.md` - Updated colleague messages with correct repo URL
- `CHANGELOG.md` - This entry

### 🎯 Why This Update
Prevents common first-time installation errors where users run `npm install` from wrong directory or skip the `cd maki-starter-kit` step.

## [3.0.0] - 2026-01-28 - 🍣 MAKI REBRAND

### 🎨 Major Visual Overhaul
- **Beautiful CLI experience** with gradient ASCII art banner
- **Boxed messages** for better organization and readability
- **Colorful spinners** using nanospinner for loading states
- **Fun emoji** throughout the interface for delightful UX
- **Gradient text** for headers and important messages

### 🔄 Complete Rebrand
- **Package name:** `mvp-starter-cli` → `maki-starter-kit`
- **CLI command:** `mvp-init` → `maki-init`
- **Brand identity:** Professional "MAKI" theme throughout

### 📦 New Dependencies
- `figlet@^1.7.0` - ASCII art text rendering
- `gradient-string@^2.0.2` - Beautiful gradient text effects
- `boxen@^7.1.1` - Boxed terminal messages
- `nanospinner@^1.1.0` - Enhanced loading animations

### ✨ Enhanced User Experience
- Welcome banner with ASCII art and gradient styling
- Configuration summary in beautiful boxed format
- Progress indicators with custom spinners
- Better error messages with styled error boxes
- Improved step-by-step instructions with emojis and colors
- Professional "Pro Tips" section in styled box
- Celebratory messages when dev server starts
- Beautiful goodbye message when setup completes

### 🎯 Updated Messaging
- All console outputs redesigned for better readability
- Consistent emoji usage throughout
- Clear visual hierarchy with boxed sections
- Fun, engaging language while remaining professional

### 🔧 Technical Changes
- Updated all imports to include new visual libraries
- Added `showWelcomeBanner()` function with figlet ASCII art
- Enhanced all spinner messages
- Improved error handling with boxed error display
- Better prerequisite checking with visual feedback

### ⚠️ Breaking Changes
- Command name changed from `mvp-init` to `maki-init`
- Package name changed from `mvp-starter-cli` to `maki-starter-kit`
- Users need to use new command name after updating

## [2.0.3] - 2026-01-28

### Fixed
- **Always generate CREATE-PENCIL-FILE.md** - File now created regardless of MCP detection status
- **Fixed MCP detection** - Removed hardcoded username path, now uses proper checkPencilMCP from lib/check-pencil.js
- **Better messaging** - Clear indication of file location and Cursor reference path
- Shows helpful message whether MCP is detected or not

### Changed
- CREATE-PENCIL-FILE.md generation moved outside MCP availability check
- Improved console output to show exact file path and @reference for Cursor
- Extraction now always succeeds and creates the instruction file

## [2.0.2] - 2026-01-28

### Fixed
- Pencil file generation now uses relative paths for monorepo structure
- CREATE-PENCIL-FILE.md now correctly references `appName/design-system/file.pen`
- Added explicit filePath parameters to batch_design and set_variables tool instructions
- Added note about workspace root requirement for Pencil MCP operations

## [2.0.1] - 2026-01-28

### Fixed
- Dev server now runs from app directory instead of project root
- Fixed "Missing script: dev" error when starting dev server

## [2.0.0] - 2026-01-28

### BREAKING CHANGES
- **Monorepo structure** - Projects now created with parent folder structure
  - New directory layout: `project-folder/app-name/`
  - Git initialized at project root (not in Next.js app)
  - npm workspaces configured for scalability

### Added
- Two-step project naming: project name (parent) + app name (nested)
- Automatic monorepo setup with npm workspaces
- Root-level `.gitignore` and workspace `package.json`
- SpecKit installed at project root (shared across potential future apps)

### Changed
- Git repository now at project root instead of Next.js app
- SpecKit `.specify/` folder at project root for shared specs
- Constitution references updated to include app path (e.g., `app/design-system/`)
- Instructions updated to reflect new directory structure
- Dev server instructions now include `cd app-name` step

### Fixed
- Clean separation between project and app concerns
- Better scalability for adding multiple apps in future

## [1.4.0] - 2026-01-28

### Added
- **Automatic constitution creation** - SpecKit constitution auto-generated with project context
  - Includes project name, primary color, component list, and file paths
  - Sets design system rules and code standards automatically
- **Pencil MCP detection** - CLI detects if Pencil is installed and adjusts instructions
  - Shows ✅ if Pencil is detected
  - Shows ⚠️ with installation steps if not detected
- **Better Pencil file generation** - Complete visual overhaul
  - Components now use real design system colors and styling
  - Added shadows, proper spacing, and professional appearance
  - Clean horizontal layout with info + visual examples
  - Realistic component examples (buttons, inputs, modals, etc.)

### Changed
- **SpecKit workflow updated to terminal commands**
  - Changed from chat slash commands to actual terminal commands
  - Instructions now show: `specify specify`, `specify plan`, etc.
  - Constitution is pre-created, users can start building immediately
- **Simplified Pencil component structure**
  - Removed complex nested frames
  - Clean 2-level structure with better maintainability
- **Improved step-by-step instructions**
  - Clearer messaging about what's created
  - Better Pro Tips with actual file locations

### Fixed
- Pencil components no longer look like cramped wireframes
- SpecKit commands now match actual CLI behavior
- Constitution references correct design system files

## [1.3.0] - 2026-01-28

### Fixed
- **CRITICAL:** Fixed repository structure that prevented installation from Git clone
  - Moved all CLI files from `mvp-starter-test/` subdirectory to repository root
  - Removed old test project files from root
  - Now works correctly: `git clone` → `npm install` → `npm link` → `mvp-init`

### Changed
- Cleaned up repository by removing `.specify/` templates (not part of CLI)
- Updated .gitignore to ignore test projects created by CLI

## [1.2.0] - 2026-01-28

### Added
- Automatic `uv` installation prompt when choosing SpecKit
- Clear Pencil installation instructions in step-by-step guide
- Better error messaging and UX throughout CLI flow

## [1.1.1] - 2026-01-27

### Fixed
- SpecKit installation error handling
- Graceful fallback when `uv` is not installed
- Better error messages with actionable instructions
- PATH detection for installed tools

### Changed
- Check for `uv` before asking about SpecKit
- Continue CLI execution even if SpecKit setup fails
- Improved prerequisite checking

## [1.1.0] - 2026-01-27

### Added
- Step-by-step instructions displayed before dev server
- Complete SpecKit workflow guide
- Exact copy-paste commands for Pencil and SpecKit
- Graceful continuation without SpecKit

### Changed
- Dev server prompt moved to end of flow
- Default changed to "No" for dev server start
- Instructions shown before terminal blocks

### Improved
- Clear separation of setup phases
- Non-blocking terminal workflow
- Better user experience for SpecKit users

## [1.0.0] - 2026-01-27

### Added
- Real GitHub SpecKit integration
- Official `specify-cli` installation
- `.specify/` folder structure from official templates

### Changed
- Replaced custom SpecKit templates with official ones
- Fixed duplicate SpecKit setup bug
- Removed auto-open Cursor behavior

### Improved
- Better error messages
- Clear next-step instructions
- Professional terminal output

## [0.9.0] - Earlier

### Added
- Next.js 15 project creation
- Design system with 62+ tokens
- 5 component library
- Pencil integration
- Component extraction
- Auto-browser opening
- Dev server management

---

For detailed release notes, see individual version documentation.
