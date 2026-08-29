# Architecture

The vault is a static, mobile-first app with 30 entries: 12 manager conversations, 9 rebuttals, and 9 corporate department-walk scripts. `index.html` contains the interface, records, type and pillar filters, search, card expansion, copy buttons, and local unlock state. Six entries are free previews. `netlify/functions/verify-license.js` verifies Gumroad keys without exposing the product ID in browser code. `netlify.toml` points Netlify to the publish directory and function directory.

Premium text is embedded in the page in v1, so the lock is commercial friction rather than strong content protection. A future version can return premium records only after verification.
