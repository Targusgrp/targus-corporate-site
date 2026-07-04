# Targus Nig Ltd Website Structure

This package is arranged so the main Targus Nig Ltd website can point to multiple business websites under the Targus Group domain.

- `index.html`: parent company / group website
- `businesses/tcop/index.html`: website for Targus Cocoa and Oil Palm Plantation
- `businesses/properties/index.html`: website for Targus Properties
- `businesses/poultry/index.html`: unused starter website template
- `businesses/farm-produce/index.html`: unused starter website template
- `businesses/logistics/index.html`: unused starter website template
- `assets/targus-hero.png`: shared hero image
- `assets/tcop-hero.png`: TCOP plantation hero image
- `assets/properties-hero.png`: Targus Properties hero image
- `styles.css`: shared visual system
- `vercel.json`: Vercel routing rules for the parent domain and business subdomains
- `package.json`: optional Vercel CLI scripts
- `VERCEL-DEPLOYMENT.md`: deployment steps

Suggested domain setup:

- `www.targusgrp.com` -> parent website
- `www.tcop.targusgrp.com` -> `businesses/tcop`
- `targuspro.targusgrp.com` -> `businesses/properties`

Contact details:

- Phone: `+2349045565017`
- Email: `info@targusgrp.com`
- Corporate address: `8, Unilag Estate, Magodo. Lagos. Nigeria.`
- Plantation address: `1 Arowogbagbo Community, Elewa Town. Ile Ife.`

To add more businesses, create a new folder inside `businesses/`, then add a card to the parent company's `Our businesses` section.
