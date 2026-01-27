# Changelog

All notable changes to the MVP Starter CLI.

## [0.8.0] - 2026-01-27 - Team-Ready Release

### 🎉 Major Features

#### Pre-flight Checks
- Added system validation before project creation
- Checks Node.js version (requires v18+)
- Checks npm availability
- Checks Cursor installation (optional)
- Checks Pencil MCP configuration (optional)
- Fails gracefully with helpful error messages

#### Optional SpecKit
- **Breaking Change:** SpecKit is now optional!
- Asks user preference after Pencil extraction
- Default: No (optimized for solo/quick projects)
- Full installation if user chooses "Yes"
- Clean skip if user chooses "No"

#### Team Distribution
- Added `INSTALLATION.md` - Complete setup guide for new users
- Added `SHARING.md` - Guide for distributing to coworkers
- Added `.gitignore` - Clean Git repository structure
- Added prerequisite checks for clean machines
- Contextual post-install help based on user choices

### ✨ Improvements

#### Better UX
- Smarter prompt timing (SpecKit after Pencil)
- Contextual help messages
- Clear success indicators
- Helpful next steps based on choices

#### Documentation
- New installation guide for teams
- Sharing guide with onboarding tips
- Troubleshooting section expanded
- Example team onboarding email

### 🐛 Bug Fixes
- Fixed prerequisite validation
- Improved error messages
- Better handling of missing dependencies

---

## [0.7.1] - 2026-01-27 - Visual Improvements

### ✨ Improvements

#### Better Component Visuals
- Improved component representations in .pen files
- Split layout (info left, visual right)
- Component-specific visuals:
  - Button: Styled purple button
  - Input: Text field with border
  - Modal: Mini modal card
  - EmptyState: Emoji icon
  - Placeholder: Dashed border box
- Professional spacing and layout

#### Simpler Prompt
- Pre-formatted variable structure
- Clear step-by-step instructions
- Proper `type` and `value` format included
- Reduced attempts from 10+ to ~3

### 📚 Documentation
- Added `CHUNK-7.1-IMPROVEMENTS.md`
- Documented visual improvements
- Added before/after comparisons

---

## [0.7.0] - 2026-01-27 - Pencil File Generation

### 🎉 Major Features
- Added `.pen` file generation via Cursor
- Component extraction to Pencil format
- Design tokens as Pencil variables
- Cursor-executable prompt generation

### 📚 Documentation
- Added `CHUNK-7-COMPLETE.md`
- Added `TEST-CHUNK-7.md`
- Updated `COMPLETE-SUMMARY.md`

---

## [0.6.0] - 2026-01-27 - Component Extraction

### 🎉 Major Features
- Automatic component extraction
- Design token parsing from CSS
- Extraction metadata (JSON + Markdown)
- Standalone extraction script
- Token categorization

### 📚 Documentation
- Added `CHUNK-6-COMPLETE.md`
- Added `TEST-CHUNK-6.md`

---

## [0.5.0-0.5.1] - 2026-01-27 - Pencil Integration

### 🎉 Major Features
- Pencil documentation and setup
- MCP integration preparation
- Component showcase on homepage
- Browser auto-open functionality

### 🐛 Bug Fixes
- Fixed port detection for auto-open
- Fixed component display on homepage

### 📚 Documentation
- Added `CHUNK-5-COMPLETE.md`
- Added `TEST-CHUNK-5.md`
- Added `UNDERSTANDING-CHUNKS.md`

---

## [0.4.0] - 2026-01-27 - SpecKit Integration

### 🎉 Major Features
- SpecKit workflow installation
- Project constitution with "Design System First" principle
- Spec/Plan/Task templates
- Custom SpecKit commands

### 📚 Documentation
- Added `CHUNK-4-COMPLETE.md`
- Added `TEST-CHUNK-4.md`

---

## [0.3.0] - 2026-01-27 - Design System

### 🎉 Major Features
- 62+ design tokens
- 5 core components (Button, Input, Modal, EmptyState, Placeholder)
- Dynamic color generation
- Dark mode support (optional)
- Component documentation

### 📚 Documentation
- Added `CHUNK-3-COMPLETE.md`

---

## [0.2.0] - 2026-01-27 - Next.js Creation

### 🎉 Major Features
- Real Next.js project creation
- Non-interactive installation
- Project verification
- Error handling and recovery

### 🐛 Bug Fixes
- Fixed port conflicts
- Fixed hanging installations
- Fixed Tailwind v4 config detection
- Auto-cleanup of existing directories

### 📚 Documentation
- Added troubleshooting guides
- Added error fix documentation

---

## [0.1.0] - 2026-01-27 - Initial Release

### 🎉 Major Features
- Interactive CLI with prompts
- Project configuration
- Terminal styling
- Progress indicators

### 📚 Documentation
- Initial README
- Basic usage guide

---

## Future Roadmap

### Planned Features
- [ ] More component variants
- [ ] Theme switching in browser
- [ ] Live sync / watch mode
- [ ] Import from Pencil (reverse sync)
- [ ] Custom component templates
- [ ] Team preset configurations

### Under Consideration
- [ ] Deploy to npm for `npx` usage
- [ ] GUI configuration tool
- [ ] Component playground
- [ ] Storybook integration
- [ ] Testing setup automation

---

**Version Format:** MAJOR.MINOR.PATCH
- MAJOR: Breaking changes
- MINOR: New features (backwards compatible)
- PATCH: Bug fixes and improvements
