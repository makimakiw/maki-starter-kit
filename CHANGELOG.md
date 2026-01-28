# Changelog

All notable changes to this project will be documented in this file.

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
