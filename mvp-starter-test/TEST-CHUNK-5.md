# 🧪 Testing Chunk 5: Pencil Integration

## Quick Test (5 minutes)

### 1. Clean Up Previous Test
```bash
cd "/Users/maxwroblewski/Test project/mvp-starter-test"
rm -rf chunk-4-demo chunk-5-demo  # Remove old tests
```

### 2. Run the CLI
```bash
npm test
```

### 3. Answer Prompts
- **Project name:** `chunk-5-demo`
- **Primary color:** Press Enter (use default #5749F4)
- **Dark mode:** `n`
- **Category colors:** `n`
- **Start dev server:** `y`

### 4. Watch the Output
You should see these NEW steps:

```
🎨 Setting Up Pencil Integration...

✔ Pencil integration ready!
  ├─ Created design-system/PENCIL-README.md
  └─ Ready for component extraction (Chunk 6)
```

### 5. Check the Browser
- Browser should auto-open to `http://localhost:3000`
- Components should be visible immediately
- No need to click any links!

---

## 📋 Verification Checklist

After the CLI completes, verify these files exist:

### Check Pencil Files
```bash
cd chunk-5-demo
ls -la design-system/
```

**Expected files:**
- ✅ `PENCIL-README.md` (NEW!)
- ✅ `PENCIL-PLACEHOLDER.md` (NEW!)
- ✅ `README.md`
- ✅ `pencildraw/` folder

### Read Pencil Documentation
```bash
cat design-system/PENCIL-README.md
```

**Check for these sections:**
- ✅ "What is Pencil?"
- ✅ "Project Setup"
- ✅ "Workflow"
- ✅ "Pencil MCP Setup"
- ✅ "What's Next (Chunk 6)"

### Verify SpecKit Still Works
```bash
ls -la .specify/
```

**Expected:**
- ✅ `.specify/memory/constitution.md`
- ✅ `.specify/templates/spec-template.md`
- ✅ `.specify/templates/plan-template.md`
- ✅ `.specify/templates/tasks-template.md`
- ✅ `.specify/templates/commands/`

---

## 🎯 What to Test

### 1. Pencil Documentation Quality

Open `design-system/PENCIL-README.md` and check:

- [ ] Is it clear what Pencil is?
- [ ] Are the setup instructions easy to follow?
- [ ] Does it explain the workflow well?
- [ ] Is it helpful for someone new to Pencil?
- [ ] Any confusing parts?

### 2. CLI Output

- [ ] Did you see "Setting Up Pencil Integration"?
- [ ] Did it show the success message?
- [ ] Was there a checkmark (✔)?
- [ ] Any errors?

### 3. Browser Auto-Open

- [ ] Did browser open automatically?
- [ ] Did it open to the right URL?
- [ ] Did components load immediately?
- [ ] No 404 errors?

### 4. Component Display

In the browser, check:

- [ ] All 5 component sections visible?
- [ ] Primary button uses your color (#5749F4)?
- [ ] Modal opens when you click "Open Modal"?
- [ ] Input fields work (can type)?
- [ ] Everything looks styled?

### 5. Previous Features Still Work

- [ ] Design system components work?
- [ ] SpecKit files were created?
- [ ] Constitution has "Design System First"?
- [ ] No broken features from Chunk 4?

---

## 🐛 Common Issues

### Issue 1: "Module not found: setup-pencil.js"

**Cause:** File wasn't created

**Fix:**
```bash
# Check if file exists
ls -la lib/setup-pencil.js

# If missing, the file wasn't created properly
# Let me know and I'll recreate it
```

### Issue 2: Pencil docs not created

**Cause:** Setup function failed silently

**Fix:**
```bash
# Check the CLI output for errors
# Should see "Setting Up Pencil Integration..."
# If you don't see it, let me know
```

### Issue 3: Browser doesn't auto-open

**Cause:** Dev server start failed

**Fix:**
```bash
# Manually open browser
open http://localhost:3000

# Or check if server is running
ps aux | grep "next dev"
```

---

## 📸 Screenshots to Share

If you want to share your test results, grab screenshots of:

1. **Terminal output** showing Pencil setup step
2. **Browser** showing components
3. **File listing** of `design-system/` folder
4. **Pencil README** content

---

## ✅ Success Criteria

Chunk 5 test is **successful** if:

1. ✅ CLI completes without errors
2. ✅ `PENCIL-README.md` is created and clear
3. ✅ `PENCIL-PLACEHOLDER.md` is created
4. ✅ Browser auto-opens
5. ✅ Components work in browser
6. ✅ All Chunk 4 features still work

---

## 🚀 After Testing

Once you've verified everything works, let me know:

1. **What worked well?**
2. **Any errors or issues?**
3. **Is the Pencil documentation clear?**
4. **Any suggestions?**

Then we'll move to **Chunk 6: Component Extraction** - the final piece! 🎨

---

## 🔧 Quick Commands Reference

```bash
# Clean up old tests
rm -rf chunk-5-demo

# Run the CLI
npm test

# Check Pencil files
cd chunk-5-demo && ls -la design-system/

# Read Pencil docs
cat design-system/PENCIL-README.md

# Check SpecKit
ls -la .specify/

# Manual dev server start (if needed)
npm run dev

# Stop dev server
Ctrl+C
```

---

**Ready to test! Let me know how it goes! 🚀**
