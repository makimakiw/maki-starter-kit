# Git Setup & Sharing

## Initial Setup

If this is a brand new repository:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: MVP Starter CLI v1.1.1"

# Add remote (replace with your repo URL)
git remote add origin YOUR_REPO_URL

# Push to remote
git push -u origin main
```

## For Existing Repository

If you already have a git repo:

```bash
# Make sure you're on the right branch
git checkout main

# Add all changes
git add .

# Commit
git commit -m "Clean up project for production use"

# Push
git push
```

## Sharing with Colleagues

### Option 1: From Git Repository

Your colleague can clone and install:

```bash
# Clone the repository
git clone YOUR_REPO_URL
cd mvp-starter-cli

# Install dependencies
npm install

# Link globally (optional)
npm link

# Use it
mvp-init
```

### Option 2: As npm Package (If Published)

If you publish to npm:

```bash
# Install globally
npm install -g mvp-starter-cli

# Use it
mvp-init
```

### Option 3: Direct from GitHub

Install directly from GitHub:

```bash
npm install -g git+https://github.com/YOUR_USERNAME/mvp-starter-cli.git

# Use it
mvp-init
```

## Colleague's Installation Steps

1. **Clone or install the CLI:**
   ```bash
   git clone YOUR_REPO_URL
   cd mvp-starter-cli
   npm install
   npm link  # For global access
   ```

2. **Install prerequisites (if using SpecKit):**
   ```bash
   # macOS/Linux
   curl -LsSf https://astral.sh/uv/install.sh | sh
   
   # Restart terminal
   ```

3. **Run the CLI:**
   ```bash
   mvp-init
   ```

4. **Follow the prompts!**

## What Your Colleague Needs

### Required:
- Node.js 18+
- npm 8+
- Git
- Cursor IDE (recommended)

### Optional (for SpecKit):
- uv (Python package manager)
- Python 3.11+

## Troubleshooting for Colleagues

### "mvp-init: command not found"

```bash
# Make sure you ran npm link
cd mvp-starter-cli
npm link

# Or use directly
npm start
```

### "Cannot find module"

```bash
# Install dependencies
npm install
```

### SpecKit Issues

```bash
# Install uv first
curl -LsSf https://astral.sh/uv/install.sh | sh

# Restart terminal

# Then run CLI again
mvp-init
```

## Updating the CLI

To get latest changes:

```bash
cd mvp-starter-cli
git pull
npm install
```

## Project Structure for Reference

```
mvp-starter-cli/
├── .gitignore           # Git ignore rules
├── README.md            # Main documentation
├── CHANGELOG.md         # Version history
├── package.json         # npm configuration
├── bin/
│   └── cli.js          # CLI entry point
├── lib/                # Core functionality
│   ├── check-prerequisites.js
│   ├── create-project.js
│   ├── extract-to-pencil.js
│   ├── generate-pen-file.js
│   ├── prompts.js
│   ├── setup-design-system.js
│   ├── setup-pencil.js
│   └── setup-speckit.js
├── scripts/            # Utility scripts
│   └── extract-components.js
└── docs/               # Documentation
    ├── INSTALLATION.md
    ├── QUICK-START.md
    ├── STEP-BY-STEP-FLOW.md
    ├── ERROR-FIXES.md
    └── REAL-SPECKIT-INTEGRATION.md
```

## Publishing to npm (Optional)

If you want to publish this to npm:

1. **Create npm account** (if you don't have one)
2. **Login:**
   ```bash
   npm login
   ```

3. **Update package.json:**
   - Change name to something unique
   - Add your author info
   - Add repository URL

4. **Publish:**
   ```bash
   npm publish
   ```

5. **Your colleagues can then:**
   ```bash
   npm install -g your-package-name
   ```

---

**Ready to share! 🚀**
