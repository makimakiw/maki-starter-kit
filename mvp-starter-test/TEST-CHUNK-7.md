# 🧪 Testing Chunk 7: .pen File Generation

## Quick Test (10 minutes)

### Part 1: CLI Test (5 minutes)

#### 1. Clean Up Previous Tests
```bash
cd "/Users/maxwroblewski/Test project/mvp-starter-test"
rm -rf test-chunk-7
```

#### 2. Run the CLI
```bash
npm test
```

#### 3. Answer Prompts
- **Project name:** `test-chunk-7`
- **Primary color:** Press Enter (default #5749F4)
- **Dark mode:** `n`
- **Category colors:** `n`
- **Start dev server:** `y`

#### 4. Watch for NEW Output

You should see:

```
📤 Extracting Components to Pencil...

✔ Component extraction complete!

  📊 Extraction Results:
     • Components:    5
     • Design Tokens: 42
     • Primary Color: #5749F4

🎨 Attempting to generate .pen file...

✔ Pencil generation script created!

  📝 Next Step - Generate .pen File:

     1. Open Cursor in this project
     2. Ask Cursor:
        "@CREATE-PENCIL-FILE.md please create the Pencil file"
```

#### 5. Verify Prompt File Created
```bash
cd test-chunk-7
ls -la design-system/ | grep CREATE
cat design-system/CREATE-PENCIL-FILE.md
```

**Expected:**
- ✅ `CREATE-PENCIL-FILE.md` exists
- ✅ Contains `open_document` instruction
- ✅ Contains `batch_design` operations
- ✅ Contains `set_variables` with tokens
- ✅ Has clear step-by-step instructions

---

### Part 2: Cursor Execution (5 minutes)

#### 1. Open Project in Cursor
```bash
cursor test-chunk-7
```

Or manually open the `test-chunk-7` folder in Cursor.

#### 2. Open Cursor Chat
- Press `Cmd+L` (Mac) or `Ctrl+L` (Windows/Linux)
- Or click the chat icon

#### 3. Send the Command
Type or paste:
```
@CREATE-PENCIL-FILE.md please create the Pencil file
```

Press Enter and wait for Cursor to execute.

#### 4. Watch Cursor Execute

Cursor should:
1. Read the prompt file
2. Call `open_document` MCP tool
3. Call `batch_design` with operations
4. Call `set_variables` with tokens
5. Confirm creation

#### 5. Verify .pen File Created
```bash
ls -la design-system/ | grep .pen
```

**Expected:**
- ✅ `pencil-designsystem-test-chunk-7.pen` exists
- ✅ File size: ~5-10 KB

#### 6. Open the .pen File
- In Cursor file explorer
- Navigate to `design-system/pencil-designsystem-test-chunk-7.pen`
- Click to open
- Pencil should launch automatically

#### 7. Verify in Pencil

**Check for:**
- [ ] Pencil editor opens?
- [ ] Shows "test-chunk-7 Design System" title?
- [ ] Shows 5 component cards?
- [ ] Each card has component name?
- [ ] Props are listed on each card?
- [ ] Primary color (#5749F4) is used?
- [ ] Layout looks organized?
- [ ] Variant badges show (Button)?

---

## 📋 Detailed Verification

### 1. Prompt File Content

Open `design-system/CREATE-PENCIL-FILE.md` and verify:

- [ ] Has project name in title?
- [ ] Step 1 shows correct file path?
- [ ] Step 2 has JavaScript operations?
- [ ] Operations include:
  - Container frame creation
  - Title text
  - 5 component frames (comp0-comp4)
  - Labels for each component
  - Props text for each
  - Badges for variants
- [ ] Step 3 has design tokens JSON?
- [ ] Tokens categorized (colors, spacing, typography)?
- [ ] Instructions are clear?

### 2. Operations Script Format

The operations should look like:

```javascript
container=I(document, {
  type: "frame",
  name: "Design System Components",
  ...
})

title=I(container, {
  type: "text",
  content: "test-chunk-7 Design System",
  ...
})

comp0=I(container, {
  type: "frame",
  name: "Button",
  ...
})

comp0Label=I(comp0, {
  type: "text",
  content: "Button",
  ...
})

// ... more operations
```

**Verify:**
- [ ] Valid JavaScript syntax?
- [ ] Binding names (container, comp0, etc.)?
- [ ] Parent references correct?
- [ ] Properties look valid (type, name, fill, etc.)?
- [ ] ~20-25 operations total?

### 3. Design Tokens

The tokens JSON should be:

```json
{
  "colors": {
    "color_primary": "#5749F4",
    "color_secondary": "#6366F1",
    ...
  },
  "spacing": {
    "spacing_xs": "4px",
    ...
  },
  "typography": { ... },
  "radius": { ... },
  "shadow": { ... }
}
```

**Verify:**
- [ ] Colors category exists?
- [ ] Spacing category exists?
- [ ] Typography category exists?
- [ ] Primary color matches prompt (#5749F4)?
- [ ] Token names converted (kebab → snake_case)?

---

## 🐛 Troubleshooting

### Issue 1: Prompt file not created

**Symptoms:**
- No `CREATE-PENCIL-FILE.md` in design-system/
- CLI shows extraction but no Pencil script

**Cause:** Generation module failed

**Fix:**
```bash
# Check if module exists
ls -la "/Users/maxwroblewski/Test project/mvp-starter-test/lib/generate-pen-file.js"

# If missing, re-implement Chunk 7
```

### Issue 2: Cursor doesn't recognize the file

**Symptoms:**
- `@CREATE-PENCIL-FILE.md` doesn't autocomplete
- Cursor says "file not found"

**Cause:** File path issue

**Fix:**
```bash
# Make sure you're in the project directory
cd test-chunk-7

# Cursor might need full path
@design-system/CREATE-PENCIL-FILE.md please create the Pencil file
```

### Issue 3: MCP tools fail

**Symptoms:**
- Cursor shows "MCP tool error"
- "user-pencil server not available"

**Cause:** Pencil MCP not configured

**Fix:**
1. Install Pencil Dev extension:
   - `Cmd+Shift+P` → "Install Extension"
   - Search "Pencil Dev"
   - Install
2. Restart Cursor
3. Try again

### Issue 4: .pen file not created

**Symptoms:**
- Cursor executes without errors
- But no .pen file appears

**Cause:** Operations failed silently

**Fix:**
1. Check Cursor output for errors
2. Verify operations syntax in prompt file
3. Try creating manually:
   ```
   Create a new Pencil file at design-system/pencil-designsystem-test-chunk-7.pen
   ```

### Issue 5: .pen file won't open

**Symptoms:**
- File exists
- But clicking doesn't launch Pencil

**Cause:** Pencil not properly installed

**Fix:**
1. Check Pencil extension is active
2. Try right-click → "Open With" → "Pencil"
3. Reinstall Pencil Dev extension if needed

---

## ✅ Success Criteria

Chunk 7 test is **successful** if:

**CLI Phase:**
1. ✅ CLI completes without errors
2. ✅ Shows "Pencil generation script created!"
3. ✅ `CREATE-PENCIL-FILE.md` file created
4. ✅ Prompt file contains valid operations
5. ✅ Design tokens converted correctly

**Cursor Phase:**
6. ✅ Cursor executes the prompt
7. ✅ MCP tools run successfully
8. ✅ `.pen` file is created
9. ✅ File opens in Pencil
10. ✅ Components visible and styled correctly

**Visual Phase:**
11. ✅ 5 component placeholders show
12. ✅ Primary color is used
13. ✅ Props are listed
14. ✅ Layout is organized
15. ✅ Can edit in Pencil

---

## 🎉 After Successful Test

Once everything works:

1. **Try editing in Pencil:**
   - Change component colors
   - Adjust layouts
   - Add new elements
   - Export changes

2. **Test re-generation:**
   ```bash
   cd "/Users/maxwroblewski/Test project/mvp-starter-test"
   npm run extract test-chunk-7
   ```
   Then run the Cursor command again.

3. **Share with team:**
   - The tool is ready for production use!
   - Everyone can generate .pen files
   - Visual design system editing is enabled

---

## 📚 What You've Built

**A complete workflow:**
1. CLI creates project
2. Design system auto-configured
3. Components extracted
4. Metadata generated
5. Pencil script created
6. One Cursor command
7. Visual editor ready!

**Benefits:**
- ✅ Design-system-first from day one
- ✅ Code ↔ Design sync
- ✅ Visual editing enabled
- ✅ Non-technical friendly
- ✅ Team-ready
- ✅ Production-ready

---

## 🚀 Next Actions

1. **Test it yourself** - Follow this guide
2. **Verify all features** - Check every checkbox
3. **Share with team** - Get feedback
4. **Use for real** - Build your next MVP!

---

**All 7 Chunks Complete - Time to Ship! 🚢**
