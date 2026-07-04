# Vercel Deployment

Deploy this folder as a static Vercel project:

`C:\Users\AlexAdeyemi\Documents\Codex\2026-07-04\ta\outputs\targus-corporate-site`

## Domains

Add these domains to the same Vercel project:

- `www.targusgrp.com`
- `www.tcop.targusgrp.com`
- `targuspro.targusgrp.com`

## DNS Records

After adding each domain in Vercel, update DNS for `targusgrp.com` at your domain registrar:

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `www` | `cname.vercel-dns.com` |
| CNAME | `www.tcop` | `cname.vercel-dns.com` |
| CNAME | `targuspro` | `cname.vercel-dns.com` |

If your DNS provider asks for a full host instead of a name, use:

- `www.targusgrp.com`
- `www.tcop.targusgrp.com`
- `targuspro.targusgrp.com`

If you use Cloudflare, set these records to DNS only while Vercel verifies them.

The `vercel.json` file rewrites subdomain traffic:

- `www.targusgrp.com` opens the parent Targus Nig Ltd website.
- `www.tcop.targusgrp.com` opens `businesses/tcop/index.html`.
- `targuspro.targusgrp.com` opens `businesses/properties/index.html`.

Shared files such as `styles.css` and `assets/...` remain available from the site root on every domain.

## Dashboard Deployment

1. Create a new Vercel project.
2. Upload or connect this folder.
3. Keep build settings empty because this is a static HTML/CSS website.
4. Add the domains above in Project Settings -> Domains.
5. Update DNS records at your domain registrar as Vercel instructs.

## CLI Deployment

Install and login:

```powershell
npm i -g vercel
vercel login
```

Deploy:

```powershell
cd C:\Users\AlexAdeyemi\Documents\Codex\2026-07-04\ta\outputs\targus-corporate-site
vercel --prod
```

After the first deploy, add each custom domain in the Vercel dashboard or with:

```powershell
vercel domains add www.targusgrp.com
vercel domains add www.tcop.targusgrp.com
vercel domains add targuspro.targusgrp.com
```

Vercel will show the DNS records to add.
