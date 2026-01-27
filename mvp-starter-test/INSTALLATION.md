# 🚀 MVP Starter - Installation Guide

## For New Users (Clean Machine Setup)

Follow these steps to install and run the MVP Starter CLI on a new machine.

---

## ✅ Prerequisites Check

Before running the CLI, you need:

1. **Node.js** (v18 or higher)
2. **npm** (comes with Node.js)
3. **Cursor** (code editor)
4. **Pencil Dev** (optional, for visual design editing)

---

## 📦 Step-by-Step Installation

### 1. Install Node.js

**Check if you have Node.js:**
```bash
node --version
npm --version
```

**If not installed:**
- Visit: https://nodejs.org
- Download LTS version (recommended)
- Run installer
- Verify: `node --version` (should show v18 or higher)

---

### 2. Install Cursor

**Check if you have Cursor:**
```bash
which cursor
# or try: cursor --version
```

**If not installed:**
- Visit: https://cursor.com
- Download for your OS (Mac/Windows/Linux)
- Install and open Cursor
- Verify it works

---

### 3. Get the MVP Starter CLI

**Option A: From Colleague (Recommended)**

Your colleague should zip the entire `mvp-starter-test` folder and send it to you.

```bash
# Create a folder for your projects
mkdir -p ~/Projects
cd ~/Projects

# Unzip the received file
unzip mvp-starter-test.zip

# Navigate into it
cd mvp-starter-test

# Install dependencies
npm install
```

**Option B: From Git Repository**

If your team has this in a Git repo:

```bash
cd ~/Projects
git clone <your-repo-url> mvp-starter-test
cd mvp-starter-test
npm install
```

---

### 4. Install Pencil Dev (Optional)

**Pencil is optional** - only needed if you want visual design editing.

**In Cursor:**

1. Open Cursor
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
3. Type: `Extensions: Install Extensions`
4. Search for: `Pencil Dev`
5. Click `Install`
6. Restart Cursor

**Verify Pencil MCP:**

The Pencil MCP connection should be automatically configured. Check:
```bash
cat ~/.cursor/mcp.json
```

You should see a `user-pencil` or `pencil` server entry.

If not, the CLI will guide you during usage.

---

### 5. SpecKit Installation (Optional)

**SpecKit is optional** - the CLI will ask if you want it during project creation.

If you choose "Yes" during CLI, SpecKit will be installed automatically into your project.

**No pre-installation needed!**

---

## 🎯 Running Your First Project

Once everything is installed:

```bash
# Navigate to the CLI folder
cd ~/Projects/mvp-starter-test

# Run the CLI
npm test

# Answer the prompts:
# - Project name: my-first-project
# - Primary color: (press Enter for default)
# - Dark mode: n
# - Category colors: n
# - Use SpecKit: n (for your first test)
# - Start dev server: y
```

**Expected time:** 2-3 minutes

---

## 🐛 Troubleshooting

### Issue 1: "command not found: npm"

**Cause:** Node.js not installed or not in PATH

**Fix:**
```bash
# Mac (using Homebrew):
brew install node

# Windows: Download from nodejs.org
# Linux: 
sudo apt install nodejs npm  # Ubuntu/Debian
sudo yum install nodejs npm   # CentOS/RHEL
```

### Issue 2: "npm install" fails

**Cause:** Network issues or npm cache problems

**Fix:**
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install

# If still fails, try with legacy peer deps
npm install --legacy-peer-deps
```

### Issue 3: "create-next-app" hangs

**Cause:** Usually network or cache issues

**Fix:**
```bash
# Clean npm cache
npm cache clean --force

# Kill any hanging processes
pkill -f "create-next-app"

# Try running CLI again
npm test
```

### Issue 4: Pencil MCP not working

**Cause:** Pencil extension not properly installed

**Fix:**
1. Check extension is installed in Cursor
2. Restart Cursor completely
3. Try creating .pen file again
4. Check `~/.cursor/mcp.json` exists

### Issue 5: Port 3000 already in use

**Cause:** Another dev server is running

**Fix:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

---

## 📋 Pre-Flight Checklist

Before running the CLI, verify:

- [ ] Node.js v18+ installed
- [ ] npm working
- [ ] Cursor installed
- [ ] CLI dependencies installed (`npm install` in mvp-starter-test)
- [ ] (Optional) Pencil Dev extension installed
- [ ] Have a folder where you want to create projects

---

## 🎓 Quick Start for Teams

**For the person sharing the CLI:**

1. **Zip the folder:**
   ```bash
   cd ~/Projects
   zip -r mvp-starter-test.zip mvp-starter-test
   ```

2. **Share with team** via:
   - Slack/Email
   - Shared drive
   - Git repository
   - Internal package manager

3. **Send this INSTALLATION.md** along with it

**For team members receiving it:**

1. Follow steps 1-3 above (Node.js, Cursor, Get CLI)
2. Run `npm install` in the CLI folder
3. Run `npm test` to create your first project
4. Share your results!

---

## 🚀 Next Steps

After installation:
1. ✅ Run your first project with `npm test`
2. ✅ Explore the created files
3. ✅ Try the browser auto-open feature
4. ✅ (Optional) Generate .pen file in Cursor
5. ✅ Start building your MVP!

---

## 📚 Additional Resources

- **CLI Documentation:** See `README.md` in mvp-starter-test folder
- **Testing Guide:** See `TEST-CHUNK-7.md` for detailed testing
- **Complete Summary:** See `COMPLETE-SUMMARY.md` for all features

---

## 💬 Getting Help

If you run into issues:

1. Check the Troubleshooting section above
2. Check `README.md` in the CLI folder
3. Ask your colleague who shared this with you
4. Check that all prerequisites are installed

---

**Installation Guide v0.7.1** - Updated 2026-01-27
