# Herbal Force V12

V12 adds:
- guided Skin Finder
- eczema, psoriasis, acne/pimples, pimple marks, vitiligo and other concerns
- age/duration questions
- recommendation engine
- product catalogue
- cart
- no-gateway EFT checkout
- unique order reference
- South Africa province/area selection
- flat R150 South Africa delivery fee
- order records for the V12 prototype admin dashboard
- private-looking admin dashboard with order statuses and search
- WhatsApp order handoff
- responsive mobile design

## Before publishing

Open `app.js` and replace:
1. `CONFIG.whatsapp`
2. `CONFIG.bank.bank`
3. `CONFIG.bank.accountName`
4. `CONFIG.bank.accountNumber`
5. `CONFIG.bank.branchCode`
6. every product `price:0` with the exact prices approved by Herbal Force.

Do not put banking login passwords, API keys or other secrets in GitHub.

## Payment model

V12 uses EFT, so there is no payment-gateway transaction fee. The customer receives bank details and a unique order reference. Herbal Force must verify the bank payment before fulfilling the order.

## Medical/product wording

The Skin Finder is deliberately a product-guidance tool, not a diagnostic system. Vitiligo is routed to direct business contact rather than making a claim that a product treats or cures it.

Review all product names, claims, age ranges, prices, bank details, WhatsApp number and contact details before going live.


## V12 admin dashboard
Open `admin.html` to view the prototype order dashboard. The dashboard reads orders saved in the same browser's local storage. It is **not production authentication** and should not be used as a real private customer database on GitHub Pages.

## V12 delivery
Every site checkout adds a flat **R150 South Africa delivery fee**. The checkout asks for the customer's province and delivery address.

## Important
Do not publish real customer personal information, bank credentials, passwords or API keys in static GitHub files. V15 should connect the order dashboard to a secure backend with authentication.
