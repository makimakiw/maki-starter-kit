# ⚡ Quick Start Guide

## For New Users - Get Running in 5 Minutes!

---

## 1️⃣ Prerequisites (1 minute)

**Check if you have Node.js:**
```bash
node --version
```

**Should show v18 or higher.** If not:
- **Mac:** `brew install node`
- **Windows/Linux:** https://nodejs.org

---

## 2️⃣ Get the CLI (1 minute)

**If you received a ZIP:**
```bash
mkdir -p ~/Projects
cd ~/Projects
unzip ~/Downloads/mvp-starter-cli.zip
cd mvp-starter-test
npm install
```

**If using Git:**
```bash
mkdir -p ~/Projects
cd ~/Projects
git clone <repo-url> mvp-starter-test
cd mvp-starter-test
npm install
```

---

## 3️⃣ Create Your First Project (2-3 minutes)

```bash
npm test
```

**Answer the prompts:**
```
? Project name: my-first-app
? Primary color: (press Enter)
? Dark mode: n
? Category colors: n
? Use SpecKit: n
? Start dev server: y
```

**Wait... Browser opens automatically!** ✅

---

## 4️⃣ Explore What Was Created

```bash
cd my-first-app
ls -la
```

**You'll see:**
- `app/` - Next.js application
- `design-system/` - 5 components + design tokens
- `package.json` - Ready to use!

**Components created:**
- Button
- Input
- Modal
- EmptyState
- Placeholder

---

## 5️⃣ Start Building!

**Use the components:**
```typescript
import { Button, Input } from '@/design-system/pencildraw';

export default function MyPage() {
  return (
    <div>
      <Button variant="primary">Click me!</Button>
      <Input label="Email" placeholder="Enter email" />
    </div>
  );
}
```

**That's it!** 🎉

---

## 🎨 Optional: Generate Pencil File

**In Cursor:**
```
@CREATE-PENCIL-FILE.md please create the Pencil file
```

This creates a visual design file you can edit in Pencil.

---

## 📚 Next Steps

**Learn more:**
- See `README.md` for full documentation
- See `design-system/README.md` for component docs
- See `INSTALLATION.md` for troubleshooting

**Build your MVP:**
- Replace homepage content
- Add your app features
- Use design system components
- Ship it! 🚀

---

## ❓ Common Questions

### "What is SpecKit?"
Workflow tool for spec-driven development. Say "No" for solo projects, "Yes" for team projects.

### "What is Pencil?"
Visual design tool. Optional - only needed if you want to edit components visually.

### "Can I change the design system?"
Yes! Edit `app/globals.css` for design tokens, or edit components in `design-system/pencildraw/`.

### "Port 3000 in use?"
```bash
lsof -ti:3000 | xargs kill -9
```

### "Need help?"
- Check `INSTALLATION.md` troubleshooting
- Ask your colleague who shared this
- Read the full `README.md`

---

## ⚡ Summary

```bash
# 1. Install Node.js v18+
# 2. Unzip or clone CLI
# 3. Run: npm install
# 4. Run: npm test
# 5. Answer prompts
# 6. Browser opens - you're done!
```

**Time: ~5 minutes total** ⚡

**Now go build!** 🚀
