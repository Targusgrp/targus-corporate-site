# GitHub Setup

The local repository is ready to publish. Create an empty GitHub repository first, then push this folder.

## Recommended Repository

Repository name:

```text
targus-corporate-site
```

Do not initialize the GitHub repository with a README, license, or `.gitignore`, because this local folder already has the project files.

## Push Commands

After creating the empty repository on GitHub, replace `YOUR-GITHUB-USERNAME` with your GitHub username or organization:

```powershell
cd C:\Users\AlexAdeyemi\Documents\Codex\2026-07-04\ta\outputs\targus-corporate-site
git remote set-url origin https://github.com/YOUR-GITHUB-USERNAME/targus-corporate-site.git
git push -u origin main
```

## Vercel Import

After the push completes:

1. Go to Vercel.
2. Choose Add New -> Project.
3. Import the `targus-corporate-site` GitHub repository.
4. Leave the build command empty.
5. Add the domains:
   - `www.targusgrp.com`
   - `www.tcop.targusgrp.com`
   - `targuspro.targusgrp.com`
6. Add the DNS records Vercel gives you.
