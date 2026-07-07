Ah, `vsce` is being protective! It detected that your `README.md` still has the default template text from when you ran `yo code`. You have two options:

---

## **Option 1: Fix the README.md (Recommended)**

Open your `README.md` file and replace its contents with something meaningful. Here's a quick template you can use:

```markdown
# Scope Variable Renamer

A VS Code extension that renames variables strictly within a selected text scope.

## Features

- Select any scope (lines of code) in your file
- Rename variables only within that selected scope
- Variables outside the scope remain unchanged
- Case-sensitive or case-insensitive matching
- Word boundary detection (won't change `variable` when renaming `var`)
- Preview and confirmation before applying changes

## How to Use

1. **Select a scope**: Highlight the lines of code where you want to rename variables
2. **Run the command**: Press `Ctrl+Shift+R` (or use Command Palette → "Rename in Scope")
3. **Enter variable name**: Type the variable name you want to find
4. **Enter new name**: Type the new variable name
5. **Choose matching mode**: Select case-sensitive or case-insensitive
6. **Confirm**: Review the match count and confirm

## Keyboard Shortcut

- **Windows/Linux**: `Ctrl+Shift+R`
- **macOS**: `Cmd+Shift+R`

## Example

Before:
```javascript
function myFunction() {
    let var = 50;
    let variable = 60;
    console.log(var);
}
```

After renaming `var` to `newVar` in the selected scope:
```javascript
function myFunction() {
    let newVar = 50;
    let variable = 60;  // ← unchanged (different variable name)
    console.log(newVar);
}
```

## Requirements

None

## Extension Settings

None

## Known Issues

None

## Release Notes

### 0.0.1
- Initial release
- Scope-based variable renaming
- Case-sensitive/insensitive matching
- Word boundary protection

---

**Enjoy!**
```
