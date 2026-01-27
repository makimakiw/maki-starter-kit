# ✅ Error Fixes - SpecKit Installation

## The Error You Saw

```
❌ Error: Command failed with ENOENT: specify init --here --ai cursor-agent --force
spawn specify ENOENT
```

**Translation:** The `specify` command was not found because SpecKit CLI wasn't installed.

## Root Cause

SpecKit requires **uv** (Python package manager) to be installed. The CLI tried to install SpecKit but failed because:

1. `uv` was not installed on your system
2. The CLI didn't check for `uv` BEFORE asking about SpecKit
3. Error handling wasn't graceful - it crashed instead of continuing

## What Was Fixed

### Fix 1: Check for `uv` BEFORE Asking About SpecKit

**Before:**
```
? Do you want to use SpecKit? Yes
[tries to install]
❌ ERROR: specify not found
```

**After:**
```
🔍 Checking for SpecKit compatibility...
⚠️  SpecKit requires uv which is not installed.
   Skipping SpecKit setup.
   
   To use SpecKit in the future:
   1. Install uv: curl -LsSf https://astral.sh/uv/install.sh | sh
   2. Run: uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
   3. In project: specify init --here --ai cursor-agent
```

### Fix 2: Graceful Error Handling

**Before:**
- SpecKit error crashed entire CLI
- User lost progress

**After:**
- SpecKit error is caught
- CLI continues without SpecKit
- Instructions shown for manual setup

### Fix 3: Better Error Messages

**Before:**
```
✖ Failed to set up SpecKit
❌ Error: Command failed with ENOENT...
```

**After:**
```
⚠️  SpecKit requires uv (Python package manager).

Quick Install:
  macOS/Linux: curl -LsSf https://astral.sh/uv/install.sh | sh
  Windows:     powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

After installing, restart your terminal and run the CLI again.
```

### Fix 4: PATH Detection

Added logic to find `specify` even if not in PATH:
- Checks `~/.local/bin/specify`
- Checks `~/.cargo/bin/specify`
- Checks `~/Library/Application Support/uv/bin/specify`

## How to Use Now

### Option A: Install uv First (Recommended)

```bash
# 1. Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# 2. Restart terminal (important!)

# 3. Run MVP CLI
cd "/Users/maxwroblewski/Test project/mvp-starter-test"
npm test

# 4. Choose SpecKit when prompted
```

### Option B: Skip SpecKit (Simpler)

```bash
# 1. Run MVP CLI
cd "/Users/maxwroblewski/Test project/mvp-starter-test"
npm test

# 2. When it says "uv not installed", that's OK
# 3. CLI will skip SpecKit automatically
# 4. You can still use all other features:
#    - Design system
#    - Pencil integration
#    - Component library
#    - Build with Cursor Chat
```

## What SpecKit Requires

### Prerequisites:
1. **uv** - Python package manager (installs Python tools)
2. **Python 3.11+** (uv will install this if needed)
3. **Git** (already required by MVP CLI)

### Why uv?
SpecKit is a Python CLI tool published on GitHub. The official installation method is:
```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

`uv` is like `npm` but for Python tools. It:
- Installs Python tools globally
- Manages dependencies
- Keeps tools isolated

## Testing the Fix

### Test 1: Without uv (Should Skip Gracefully)

```bash
# Make sure uv is NOT installed
which uv  # Should say "not found"

# Run CLI
npm test

# Expected:
# ✓ Creates project
# ✓ Sets up design system
# ⚠️ Shows uv not installed message
# ✓ Skips SpecKit
# ✓ Shows instructions
# ✓ Continues successfully
```

### Test 2: With uv (Should Install SpecKit)

```bash
# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# Restart terminal

# Run CLI
npm test

# Expected:
# ✓ Creates project
# ✓ Sets up design system
# ✓ Detects uv
# ? Asks about SpecKit
# ✓ Installs SpecKit if Yes
# ✓ Shows instructions
# ✓ Continues successfully
```

## Quick Install uv

### macOS/Linux:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh

# Then restart terminal or:
source ~/.bashrc  # or ~/.zshrc
```

### Windows:
```powershell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Then restart terminal
```

### Verify Installation:
```bash
uv --version
# Should show: uv 0.x.x
```

## Manual SpecKit Setup

If you want to add SpecKit later:

```bash
# 1. Install uv (if not already)
curl -LsSf https://astral.sh/uv/install.sh | sh

# 2. Install SpecKit CLI
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# 3. Verify installation
specify --version

# 4. Initialize in your project
cd your-project-name
specify init --here --ai cursor-agent

# 5. Use in Cursor
# /speckit.constitution
# /speckit.specify
# /speckit.plan
# /speckit.tasks
# /speckit.implement
```

## Files Changed

1. **`lib/setup-speckit.js`**
   - Added `checkUvAvailable()` function
   - Better error handling
   - PATH detection for specify
   - Clearer error messages

2. **`bin/cli.js`**
   - Check for uv BEFORE asking about SpecKit
   - Graceful error handling (don't crash)
   - Show clear instructions if uv missing

## Summary

✅ **Fixed:** CLI no longer crashes if SpecKit fails  
✅ **Fixed:** Check for uv before asking about SpecKit  
✅ **Fixed:** Clear error messages with actionable steps  
✅ **Fixed:** PATH detection for installed tools  
✅ **Improved:** Graceful degradation (works without SpecKit)

## Try Again

```bash
cd "/Users/maxwroblewski/Test project/mvp-starter-test"

# Clean up previous test
rm -rf maxxx

# Run again
npm test

# If you want SpecKit: Install uv first
# If you don't need SpecKit: Just run and it will skip it
```

---

*Error fixes applied: 2026-01-27*
