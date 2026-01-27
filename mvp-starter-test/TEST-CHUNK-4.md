# 🧪 Test Chunk 4: SpecKit Integration

## Quick Test (5 minutes)

### 1. Run the CLI
```bash
cd "/Users/maxwroblewski/Test project/mvp-starter-test"
npm test chunk-4-test
```

### 2. Answer Prompts
- Primary color: (press Enter for default #5749F4)
- Dark mode: `n` (or `y` if you want)
- Category colors: `n`

### 3. Say "Yes" to Start Dev Server
- Browser should open automatically
- Check homepage has purple "🧪 Test Components" button

---

## Detailed Verification Checklist

### ✅ SpecKit Files Created

**Check 1: Constitution exists**
```bash
cd chunk-4-test
ls -la .specify/memory/constitution.md
```
Expected: File exists

**Check 2: Constitution has 6 principles**
```bash
grep "Principle" .specify/memory/constitution.md
```
Expected output:
```
### Principle 1: Clean Code
### Principle 2: Simple UX
### Principle 3: Responsive Design
### Principle 4: Minimal Dependencies
### Principle 5: Design System First
### Principle 6: No Testing Policy
```

**Check 3: Your color is in constitution**
```bash
grep "Primary Brand Color" .specify/memory/constitution.md
```
Expected: Shows your chosen color (default: #5749F4)

**Check 4: Templates exist**
```bash
ls .specify/templates/
```
Expected:
- spec-template.md
- plan-template.md
- tasks-template.md
- commands/ (directory)

**Check 5: Commands exist**
```bash
ls .specify/templates/commands/
```
Expected:
- speckit.constitution.md
- speckit.specify.md
- speckit.designsystem.md ← NEW in Chunk 4!

---

### ✅ Templates Have Design System Integration

**Check 6: Spec template has design system section**
```bash
grep "Design System Components" .specify/templates/spec-template.md
```
Expected: Shows section header

**Check 7: Plan template has Phase 0**
```bash
grep "Phase 0: Design System Review" .specify/templates/plan-template.md
```
Expected: Shows Phase 0 content

**Check 8: Tasks template has DS tasks**
```bash
grep "DS-\[N\]: Design System Tasks" .specify/templates/tasks-template.md
```
Expected: Shows DS task category

---

### ✅ Design System Still Works (from Chunk 3)

**Check 9: Components exist**
```bash
ls design-system/pencildraw/
```
Expected: 5 .tsx files + index.tsx

**Check 10: Globals has tokens**
```bash
grep "--color-primary" app/globals.css
```
Expected: Shows your color

**Check 11: Test page works**
- Visit: http://localhost:3000/test-components
- Should show all 5 components
- Your primary color should appear in buttons/links

---

## 🎯 What's New in Chunk 4?

| Feature | Status | Location |
|---------|--------|----------|
| Constitution | ✅ NEW | `.specify/memory/constitution.md` |
| Design System First Principle | ✅ NEW | Constitution Principle 5 |
| Spec Template with DS | ✅ NEW | `.specify/templates/spec-template.md` |
| Plan Template with Phase 0 | ✅ NEW | `.specify/templates/plan-template.md` |
| Tasks Template with DS | ✅ NEW | `.specify/templates/tasks-template.md` |
| SpecKit Commands | ✅ NEW | `.specify/templates/commands/*.md` |

---

## 💡 Quick Demo of SpecKit

### 1. Read the Constitution
```bash
cat .specify/memory/constitution.md
```

Look for:
- **Principle 5: Design System First**
- Rules about using CSS variables
- Your project's brand color
- Dark mode setting

### 2. Check a Template
```bash
cat .specify/templates/spec-template.md
```

Look for:
- "## Design System Components" section
- Checklist of components (Button, Input, Modal, etc.)
- Design tokens section
- Design System Compliance verification

### 3. Check Design System Command
```bash
cat .specify/templates/commands/speckit.designsystem.md
```

Look for:
- `@speckit.designsystem status` command
- `@speckit.designsystem audit` command (finds hard-coded colors!)
- Component and token management commands

---

## 🐛 Troubleshooting

### Problem: No `.specify/` directory
**Solution:** SpecKit setup might have failed. Check terminal output for errors.

### Problem: Constitution has wrong color
**Solution:** Check if you entered color correctly during prompts.

### Problem: Missing command files
**Solution:** Check `.specify/templates/commands/` - should have 3 .md files.

### Problem: Templates look wrong
**Solution:** Compare with this guide - templates should have design system sections.

---

## ✨ What to Test

1. ✅ **All Chunk 3 features still work** (components, design tokens, test page)
2. ✅ **Constitution exists** with 6 principles
3. ✅ **Principle 5 is "Design System First"**
4. ✅ **Templates have design system sections**
5. ✅ **3 command files exist**
6. ✅ **Your brand color appears in constitution**

---

## 🚀 After Testing

If everything works:
- ✅ Constitution created ✨
- ✅ Templates have design system integration ✨
- ✅ Commands for DS management ✨
- ✅ All Chunk 3 features still work ✨

**You're ready for Chunk 5: Pencil Setup!** 🎉

If something doesn't work:
- Share the error message
- Share which check failed
- Share terminal output from the CLI

---

## 📊 Expected Project Structure After Chunk 4

```
chunk-4-test/
├── .specify/                      ← NEW!
│   ├── memory/
│   │   └── constitution.md       ← 6 principles
│   └── templates/
│       ├── spec-template.md      ← DS integration
│       ├── plan-template.md      ← Phase 0: DS Review
│       ├── tasks-template.md     ← DS tasks
│       └── commands/
│           ├── speckit.constitution.md
│           ├── speckit.specify.md
│           └── speckit.designsystem.md  ← NEW!
├── app/
│   ├── globals.css               ← Design tokens
│   ├── page.tsx                  ← Modified homepage
│   └── test-components/
│       └── page.tsx              ← Component showcase
├── design-system/
│   ├── pencildraw/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Placeholder.tsx
│   │   └── index.tsx
│   └── README.md
├── package.json
└── next.config.ts
```

---

**Happy testing! 🎯**
