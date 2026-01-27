# 📦 Sharing MVP Starter with Your Team

## Quick Guide for Distribution

This CLI tool is ready to share with your coworkers! Follow these steps.

---

## 🎯 For You (The Person Sharing)

### Step 1: Prepare the Package

```bash
# Navigate to the CLI folder
cd "/Users/maxwroblewski/Test project/mvp-starter-test"

# Make sure everything is up to date
npm install

# Test it works
npm test
# (Ctrl+C to cancel after you see it working)
```

### Step 2: Create Distribution Package

**Option A: Zip File (Easiest)**

```bash
cd "/Users/maxwroblewski/Test project"
zip -r mvp-starter-cli.zip mvp-starter-test -x "*/node_modules/*" -x "*/chunk-*" -x "*/test-*" -x "*/.DS_Store"
```

This creates `mvp-starter-cli.zip` (~100KB without node_modules)

**Option B: Git Repository (Best for Teams)**

```bash
cd mvp-starter-test

# Initialize git if not already
git init

# Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
chunk-*/
test-*/
hej/
makione/
makitwo/
.DS_Store
npm-debug.log*
*.pen
EOF

# Commit everything
git add .
git commit -m "Initial commit: MVP Starter CLI v0.8.0"

# Push to your company's Git server
git remote add origin <your-company-repo-url>
git push -u origin main
```

### Step 3: Share With Team

**Via Zip:**
- Email the .zip file
- Upload to Slack/Teams
- Put on shared drive
- Share Dropbox/Google Drive link

**Via Git:**
- Share the repository URL
- Add team members to repo
- They can clone it

**Include These Files:**
- `mvp-starter-cli.zip` or Git URL
- Link to `INSTALLATION.md` (or email the instructions)

---

## 👥 For Your Coworkers (Receiving the CLI)

### Quick Start (5 minutes)

**Step 1: Install Prerequisites**

```bash
# Check Node.js
node --version  # Should be v18+

# If not installed:
# Mac: brew install node
# Windows: https://nodejs.org
# Linux: sudo apt install nodejs npm
```

**Step 2: Get the CLI**

**If you received a ZIP:**
```bash
# Create projects folder
mkdir -p ~/Projects
cd ~/Projects

# Unzip
unzip ~/Downloads/mvp-starter-cli.zip

# Navigate
cd mvp-starter-test

# Install dependencies
npm install
```

**If using Git:**
```bash
mkdir -p ~/Projects
cd ~/Projects

# Clone
git clone <your-company-repo-url> mvp-starter-test
cd mvp-starter-test

# Install dependencies
npm install
```

**Step 3: Run Your First Project**

```bash
# Run the CLI
npm test

# Answer prompts:
# - Project name: my-test-project
# - Primary color: (press Enter)
# - Dark mode: n
# - Category colors: n
# - Use SpecKit: n (for first test)
# - Start dev server: y

# Wait 2-3 minutes...
# Browser opens automatically!
```

**That's it!** 🎉

---

## 📋 What Your Coworkers Need

### Required
- ✅ Node.js v18+ ([nodejs.org](https://nodejs.org))
- ✅ npm (comes with Node.js)
- ✅ The CLI package (zip or Git clone)

### Optional
- 💡 Cursor editor ([cursor.com](https://cursor.com)) - for .pen file generation
- 💡 Pencil Dev extension - install in Cursor for visual editing

---

## 🎓 Onboarding Your Team

### Suggested Onboarding Flow

**Week 1: Installation & First Project**
1. Share CLI package
2. Team members install Node.js
3. Run first test project
4. Explore generated files
5. Share screenshots in team chat

**Week 2: Learn the Workflow**
1. Create real project with SpecKit
2. Build first feature using components
3. Try Pencil visual editing (optional)
4. Share learnings

**Week 3: Full Speed**
1. Start using for actual MVPs
2. Share design system tweaks
3. Build team conventions

---

## 🔧 Common Setup Issues

### "npm: command not found"
**Fix:** Install Node.js from nodejs.org

### "npm install" fails
**Fix:**
```bash
npm cache clean --force
npm install --legacy-peer-deps
```

### "Permission denied"
**Fix:**
```bash
# Don't use sudo! Fix npm permissions:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
source ~/.zshrc
```

### Port 3000 already in use
**Fix:**
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

---

## 📊 What Gets Created

When a coworker runs the CLI, they get:

```
my-project/
├── app/                          # Next.js app
│   ├── globals.css              # 62+ design tokens
│   ├── layout.tsx
│   └── page.tsx                 # Component showcase
├── design-system/
│   ├── pencildraw/              # 5 components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── EmptyState.tsx
│   │   └── Placeholder.tsx
│   ├── README.md
│   ├── PENCIL-README.md
│   ├── PENCIL-EXTRACTION.json
│   ├── PENCIL-EXTRACTION.md
│   └── CREATE-PENCIL-FILE.md    # For Cursor execution
├── .specify/                     # If they chose SpecKit
│   ├── memory/
│   │   └── constitution.md
│   └── templates/
│       ├── spec-template.md
│       ├── plan-template.md
│       └── tasks-template.md
├── package.json
├── tsconfig.json
└── ...
```

**Total:** ~45 files, ready to use!

---

## 🎯 Team Best Practices

### 1. Consistent Setup
Everyone should use the same CLI version for consistency.

**Update everyone when you update:**
```bash
# You make improvements
cd mvp-starter-test
# ... make changes ...
git commit -am "Improved component styling"
git push

# Team members update
git pull
npm install
```

### 2. Shared Conventions
Decide as a team:
- Always use SpecKit? Or optional?
- Standard color palette?
- Dark mode by default?
- Naming conventions?

Update `lib/prompts.js` with team defaults.

### 3. Component Library
As your team builds components:
- Add them to `design-system/pencildraw/`
- Update extraction to include them
- Share updates with team

### 4. Documentation
Keep these docs updated:
- `README.md` - Usage guide
- `INSTALLATION.md` - Setup instructions
- `SHARING.md` - This file!

---

## 💬 Support Channels

Set up support for your team:

**Option 1: Slack/Teams Channel**
- Create #mvp-starter-help channel
- Share tips and tricks
- Help troubleshoot issues

**Option 2: Internal Wiki**
- Document team-specific setup
- Add company conventions
- Share example projects

**Option 3: Regular Sync**
- Weekly demo of new features
- Share improvements
- Collect feedback

---

## 🚀 Advanced: Customize for Your Team

### Change Default Values

Edit `lib/prompts.js`:

```javascript
// Change default color to your company brand
{
  name: 'primaryColor',
  default: '#YOUR-BRAND-COLOR'  // Change this!
}

// Always include dark mode
{
  name: 'darkMode',
  default: true  // Change from false to true
}
```

### Add Company Components

Add to `lib/setup-design-system.js`:

```javascript
// Add your company's standard components
await createComponents(designSystemDir);

// Add company-specific components
await createCompanyComponents(designSystemDir);
```

### Modify SpecKit Templates

Edit `.specify/templates/` files to match your team's workflow.

---

## 📈 Tracking Adoption

Monitor CLI usage:

```bash
# See how many projects were created
ls -ld */ | wc -l

# See what people are building
ls -ld */ | grep -v "node_modules"
```

Collect feedback:
- What works well?
- What's confusing?
- What's missing?
- What should change?

---

## 🎉 Success Metrics

Your distribution is successful if:

✅ Team members can install without help  
✅ First project works in < 5 minutes  
✅ Everyone uses consistent setup  
✅ Projects are created faster than before  
✅ Design system is used automatically  

---

## 📞 Getting Help

**For setup issues:**
→ See `INSTALLATION.md`

**For usage questions:**
→ See `README.md`

**For team sharing:**
→ You're reading it! (This file)

---

## 🎓 Example Team Onboarding Email

```
Subject: New MVP Starter CLI - Get Started in 5 Minutes!

Hey team!

I'm sharing our new MVP Starter CLI that automates project setup.

What it does:
✅ Creates Next.js projects with our design system
✅ Includes 5 ready-to-use components
✅ Sets up Pencil for visual editing
✅ Optional SpecKit for structured development

Getting started:
1. Download: [Link to ZIP or Git repo]
2. Follow: See INSTALLATION.md (attached)
3. Run: npm test in the folder
4. Done! Project created in 2-3 minutes

Requirements:
- Node.js v18+ (https://nodejs.org)
- That's it!

Questions? #mvp-starter-help channel

Let's build faster! 🚀
```

---

**Ready to share!** Send this guide along with your CLI package. 📦
