# Dropbox Sync Conflict Fix

## Issue
Next.js build files in `.next/` directory are causing UNKNOWN errors due to Dropbox sync conflicts.

## Root Cause
Dropbox is trying to sync the `.next/` directory while Next.js is actively reading/writing build files, causing file locking conflicts on Windows.

## Solution: Exclude .next from Dropbox Sync

### Option 1: Selective Sync (Recommended)

1. Open Dropbox desktop app
2. Click the Dropbox icon in system tray
3. Click your profile icon → Preferences
4. Go to "Sync" tab → "Selective Sync"
5. Find your project folder: `KYOUDAI_Civilization\kyoudaidev`
6. Uncheck the `.next` folder
7. Click "Update"

### Option 2: Command Line (Windows)

Run this in PowerShell as Administrator:

```powershell
# Navigate to project directory
cd "C:\Users\ai2Aibou\Dropbox\KYOUDAI_Civilization\kyoudaidev"

# Set .next folder to not sync
Set-Content -Path ".next" -Stream com.dropbox.ignored -Value 1
```

### Option 3: .dropboxignore (If Available)

Create a `.dropboxignore` file in project root:

```
.next/
node_modules/
.vercel/
*.tsbuildinfo
```

Note: This feature may not be available on all Dropbox plans.

## Immediate Fix

Clear the build cache and restart dev server:

```bash
# Clear Next.js cache
Remove-Item -Recurse -Force .next

# Restart dev server
npm run dev
```

## Prevention

Add these folders to Dropbox exclusions:
- `.next/` - Next.js build output
- `node_modules/` - Dependencies (should already be excluded)
- `.vercel/` - Vercel deployment cache

## Alternative: Move Project Outside Dropbox

If sync conflicts persist, consider moving the project to a local directory:

```powershell
# Move project to local drive
Move-Item "C:\Users\ai2Aibou\Dropbox\KYOUDAI_Civilization\kyoudaidev" "C:\Dev\kyoudaidev"

# Update git remote if needed
cd C:\Dev\kyoudaidev
git remote -v
```

Then use Git for version control instead of Dropbox sync.

## Verify Fix

After applying the fix:

1. Clear cache: `Remove-Item -Recurse -Force .next`
2. Start dev server: `npm run dev`
3. Check for errors in terminal
4. Verify Dropbox is not syncing `.next/` folder

## Additional Notes

- The `.next/` folder is already in `.gitignore`
- This is a build artifact and should never be synced
- Each developer should build locally
- Only source code should be synced/committed
