# Manager Field Script Vault: 30 Scripts

## Before deployment

1. The purchase button is already connected to `https://mattenglehart.gumroad.com/l/rmos-script-vault`.
2. Gumroad license-key delivery is already enabled for this product.
3. In Netlify, drag and drop `manager-conversation-vault-netlify-ready.zip` into **Add new site → Deploy manually**.
4. In the new Netlify site, open **Site configuration → Environment variables** and add:
   - Key: `GUMROAD_PRODUCT_ID`
   - Value: the product ID shown by Gumroad for this product (not the permalink)
5. Trigger a new deploy after adding the environment variable.
6. Test one real license key in an incognito/private browser window.

The vault contains 12 manager conversations, 9 real-time rebuttals, and 9 corporate department-walk scripts. Six entries are free previews; the remaining 24 unlock after purchase verification.

## Gumroad delivery

Upload `manager-conversation-vault-customer-ready.zip` to the Gumroad product. It contains a Start Here page connected to `https://rmos-script-vault.netlify.app` and explains where buyers find their license key.

Do not upload the Netlify ZIP as the customer-facing download unless you specifically want customers to receive the source code.
