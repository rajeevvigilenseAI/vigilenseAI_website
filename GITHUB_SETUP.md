# Push Vigilense AI Website to GitHub & Publish

Follow these steps to connect this folder to GitHub and publish it as a website (GitHub Pages).

---

## Step 1: Install Git (if you haven’t)

1. Download: https://git-scm.com/download/win  
2. Run the installer (defaults are fine).  
3. **Close and reopen** Terminal/PowerShell (or Cursor) so `git` is in your PATH.

---

## Step 2: Initialize Git and make the first commit (in this folder)

Open **Terminal** or **PowerShell** in Cursor (or in this folder) and run:

```powershell
cd "c:\Users\rajee\OneDrive\Documents\Vigilense AI website"

git init
git add .
git commit -m "Initial commit: Vigilense AI website"
```

---

## Step 3: Create a new repository on GitHub

1. Go to **https://github.com/new**  
2. **Repository name:** e.g. `vigilense-ai-website` or `vigilense-ai`  
3. **Description (optional):** e.g. `Vigilense AI – AI-powered SIEM marketing site`  
4. Choose **Public**.  
5. **Do not** check “Add a README” (you already have files).  
6. Click **Create repository**.

---

## Step 4: Connect this folder to your new repo and push

GitHub will show you “push an existing repository from the command line.” Use your **actual repo URL** (replace `YOUR_USERNAME` and `YOUR_REPO_NAME`):

```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

**Your repo:** https://github.com/rajeevdce90/Vigilense AI-website

```powershell
git remote add origin https://github.com/rajeevdce90/Vigilense AI-website.git
git branch -M main
git push -u origin main
```

When prompted:
- **Username:** your GitHub username  
- **Password:** use a **Personal Access Token** (not your GitHub password).  
  - Create one: GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token**.  
  - Give it `repo` scope. Copy the token and paste it when Git asks for a password.

---

## Step 5: Turn on GitHub Pages (publish as website)

1. On GitHub, open your repo → **Settings** → **Pages** (left sidebar).  
2. Under **Source**, choose **Deploy from a branch**.  
3. **Branch:** `main` (or `master`), folder **/ (root)**.  
4. Click **Save**.

After a minute or two, your site will be at:

**https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/**

Example: `https://rajee.github.io/Vigilense AI-website/`

---

## Summary

| Step | What to do |
|------|------------|
| 1 | Install Git from git-scm.com |
| 2 | In this folder: `git init`, `git add .`, `git commit -m "Initial commit"` |
| 3 | Create a new **empty** repo at github.com/new |
| 4 | `git remote add origin <your-repo-url>`, `git push -u origin main` |
| 5 | Repo **Settings** → **Pages** → deploy from branch `main` |

If any command asks for credentials, use your GitHub username and a Personal Access Token as the password.
