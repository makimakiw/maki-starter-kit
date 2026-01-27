# Changelog

All notable changes to this project will be documented in this file.

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
