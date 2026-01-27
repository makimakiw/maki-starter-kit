# 🧪 Testing Chunk 6: Component Extraction

## Quick Test (5 minutes)

### 1. Clean Up Previous Tests
```bash
cd "/Users/maxwroblewski/Test project/mvp-starter-test"
rm -rf chunk-5-demo chunk-6-demo
```

### 2. Run the CLI
```bash
npm test
```

### 3. Answer Prompts
- **Project name:** `chunk-6-demo`
- **Primary color:** Press Enter (default #5749F4)
- **Dark mode:** `n`
- **Category colors:** `n`
- **Start dev server:** `y`

### 4. Watch for NEW Output

You should see this NEW step:

```
📤 Extracting Components to Pencil...

✔ Component extraction complete!
  • File: design-system/pencil-designsystem-chunk-6-demo.pen
  • Components: 5
  • Design Tokens: 62
  • Ready to open in Pencil!
```

### 5. Check the Browser
- Browser should auto-open
- All 5 components visible
- Everything styled correctly

---

## 📋 Verification Checklist

### Check Extraction Files
```bash
cd chunk-6-demo
ls -la design-system/
```

**Expected NEW files:**
- ✅ `PENCIL-EXTRACTION.json` (NEW!)
- ✅ `PENCIL-EXTRACTION.md` (NEW!)
- ✅ `PENCIL-README.md`
- ✅ `PENCIL-PLACEHOLDER.md`
- ✅ `README.md`
- ✅ `pencildraw/` folder

### Read Extraction Summary
```bash
cat design-system/PENCIL-EXTRACTION.md
```

**Check for:**
- ✅ Project name: "chunk-6-demo"
- ✅ 5 components listed (Button, Input, Modal, EmptyState, Placeholder)
- ✅ Each component shows props and variants
- ✅ Design tokens categorized (Colors, Spacing, Typography, etc.)
- ✅ Usage instructions
- ✅ Sync workflow

### Check Extraction Metadata
```bash
cat design-system/PENCIL-EXTRACTION.json | grep -E '(projectName|totalComponents|totalTokens)'
```

**Expected:**
```json
"projectName": "chunk-6-demo",
"totalComponents": 5,
"totalTokens": 62,
```

### Test Standalone Extraction Script
```bash
cd "/Users/maxwroblewski/Test project/mvp-starter-test"
npm run extract chunk-6-demo
```

**Expected output:**
```
🎨 Component Extraction Tool

Project: chunk-6-demo
Primary Color: #5749F4

✔ Component extraction complete!

✅ Extraction complete!

Check design-system/PENCIL-EXTRACTION.md for details.
```

---

## 🎯 What to Test

### 1. Extraction Metadata Quality

Open `design-system/PENCIL-EXTRACTION.md` and verify:

- [ ] Is the component list complete (5 components)?
- [ ] Does each component show props?
- [ ] Are variants correctly identified?
- [ ] Are states correctly identified?
- [ ] Are tokens grouped by category?
- [ ] Is the token count accurate (62+)?
- [ ] Are usage instructions clear?

### 2. Extraction JSON

Open `design-system/PENCIL-EXTRACTION.json` and verify:

- [ ] Valid JSON format?
- [ ] Contains all 5 components?
- [ ] Each component has correct props?
- [ ] Contains all design tokens?
- [ ] Tokens correctly categorized?
- [ ] Stats section accurate?

### 3. CLI Output

- [ ] Did extraction step run?
- [ ] Did it show component count (5)?
- [ ] Did it show token count (62)?
- [ ] Any errors or warnings?

### 4. Browser Display

In the browser:

- [ ] Components load immediately?
- [ ] All 5 component sections visible?
- [ ] Buttons work (click to test)?
- [ ] Modal opens (click "Open Modal")?
- [ ] Input fields work (type to test)?
- [ ] Primary color appears correctly?
- [ ] Footer note mentions "Chunk 6"?

### 5. Standalone Script

- [ ] Script runs without errors?
- [ ] Detects project name correctly?
- [ ] Detects primary color correctly?
- [ ] Generates same files as CLI?
- [ ] Can be run multiple times?

### 6. Previous Features

- [ ] Design system components work?
- [ ] SpecKit files created?
- [ ] Constitution has "Design System First"?
- [ ] Pencil documentation exists?
- [ ] Browser auto-opens?
- [ ] No broken features?

---

## 🐛 Common Issues

### Issue 1: "Component extraction failed"

**Cause:** Component files not found

**Fix:**
```bash
# Check if components exist
ls -la chunk-6-demo/design-system/pencildraw/

# Should see: Button.tsx, Input.tsx, Modal.tsx, EmptyState.tsx, Placeholder.tsx
```

### Issue 2: "Pencil MCP not available"

**This is EXPECTED!** The extraction still works and creates:
- ✅ PENCIL-EXTRACTION.json
- ✅ PENCIL-EXTRACTION.md
- ✅ PENCIL-MANUAL-EXTRACTION.md (with setup instructions)

**Not an error** - just means MCP isn't configured yet.

### Issue 3: Token count is wrong

**Cause:** globals.css format different

**Fix:**
```bash
# Check globals.css format
head -20 chunk-6-demo/app/globals.css

# Should see CSS variables like: --color-primary: #5749F4;
```

### Issue 4: Standalone script doesn't find project

**Cause:** Wrong path or missing package.json

**Fix:**
```bash
# Provide full path
npm run extract "/Users/maxwroblewski/Test project/mvp-starter-test/chunk-6-demo"

# Or run from project root
cd chunk-6-demo
npm run extract .
```

---

## 📸 Screenshots to Share

If you want to share results:

1. **Terminal** showing extraction step
2. **Browser** showing components
3. **File listing** of design-system/
4. **Extraction summary** (first 50 lines of PENCIL-EXTRACTION.md)
5. **JSON metadata** (formatted)

---

## ✅ Success Criteria

Chunk 6 test is **successful** if:

1. ✅ CLI completes without errors
2. ✅ `PENCIL-EXTRACTION.json` created
3. ✅ `PENCIL-EXTRACTION.md` created and clear
4. ✅ 5 components detected
5. ✅ 62+ tokens extracted
6. ✅ Standalone script works
7. ✅ Browser displays components
8. ✅ All Chunk 5 features still work

---

## 🎉 After Testing

Once you've verified everything works, this CLI is **COMPLETE**!

### What You Now Have:

**A complete MVP starter tool that:**
- Creates Next.js projects ✅
- Sets up design systems ✅
- Installs SpecKit ✅
- Configures Pencil ✅
- Extracts components ✅
- Auto-opens browser ✅
- Generates documentation ✅

### Next Steps:

1. **Share with your team!**
   ```bash
   # Package it up
   cd "/Users/maxwroblewski/Test project/mvp-starter-test"
   npm pack
   ```

2. **Use it for real projects!**
   ```bash
   npm test
   # Answer prompts
   # Start building!
   ```

3. **Customize it:**
   - Add more components
   - Modify design tokens
   - Adjust SpecKit templates
   - Enhance extraction

---

## 🔧 Quick Commands Reference

```bash
# Clean up tests
rm -rf chunk-6-demo

# Run CLI (full workflow)
npm test

# Check extraction files
cd chunk-6-demo && ls -la design-system/

# Read extraction summary
cat design-system/PENCIL-EXTRACTION.md

# View extraction metadata
cat design-system/PENCIL-EXTRACTION.json | jq

# Re-run extraction
npm run extract chunk-6-demo

# Manual dev server
cd chunk-6-demo && npm run dev

# Stop dev server
Ctrl+C
```

---

**Ready to test! This is the final chunk - let's make sure it works perfectly! 🚀**
