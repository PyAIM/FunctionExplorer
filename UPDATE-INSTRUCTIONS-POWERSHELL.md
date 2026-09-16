# Updating Function Explorer from PowerShell

This update preserves the GitHub Pages deployment already configured for `https://pyaim.github.io/FunctionExplorer/`. It replaces the app source and the generated `docs` folder while keeping your repository’s `.git` history intact.

## 1. Extract the update

Download the ZIP file and extract it into a new folder, such as `C:\Users\mbazz\Downloads\FunctionExplorer-Enhanced`.

## 2. Copy the enhanced app into the existing repository

Open PowerShell and adjust `$source` only if you extracted the ZIP elsewhere. `$repo` should be the existing local clone connected to `https://github.com/pyaim/FunctionExplorer`.

```powershell
$source = "C:\Users\mbazz\Downloads\FunctionExplorer-Enhanced\FunctionExplorer"
$repo = "C:\Users\mbazz\Downloads\FunctionExplorer-GitHub-Pages\FunctionExplorer"

Get-ChildItem -Force $source |
  Where-Object { $_.Name -ne ".git" } |
  Copy-Item -Destination $repo -Recurse -Force

Set-Location $repo
git status
git add .
git commit -m "Enhance randomized practice and student scorecards"
git push origin main
```

## 3. Verify the published update

Wait one to three minutes for GitHub Pages, then hard-refresh your browser and open:

```text
https://pyaim.github.io/FunctionExplorer/
```

## What changed

The app now uses 20-question banks for every regular activity and a 48-question cumulative bank for the final. Every retry selects a fresh 8- or 9-question regular run, while the final selects 20 questions. Piecewise functions use a two-column case display; fill-in responses include controls for `∞`, `−∞`, `∪`, parentheses, brackets, and inequality symbols. The final now remains visibly marked as cleared after success. The student scorecard is exportable as CSV/text or printable to PDF.
