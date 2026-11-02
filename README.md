# SN Restaurant website

A mobile-first restaurant landing page built with plain HTML, CSS, and JavaScript. No build step or package install is required.

## Files

- `index.html` — page content, SEO/Open Graph metadata, Restaurant JSON-LD, and the sample business details.
- `styles.css` — responsive layout, light/dark themes, photo treatments, and motion.
- `script.js` — menu filters, carousels, photo lightbox, mobile navigation, theme switch, scroll reveals, and WhatsApp booking.
- `favicon.svg` — simple editable site icon.

Open `index.html` directly in a modern browser, or deploy the folder to Netlify or Vercel. Google Fonts, map tiles, and Unsplash photos use external services and need an internet connection.

## Customize before publishing

1. In `script.js`, replace `restaurantConfig.phone` and `restaurantConfig.whatsapp` with the restaurant's real phone number. Use international format; the WhatsApp value must contain digits only, including the country code.
2. In `index.html`, replace the sample restaurant story and `Your chef's name`, menu names, descriptions, dietary markers, badges, and example prices. Fill the rating, customer-count, and food-safety trust placeholders only with verified facts.
3. Replace the sample address, map query, phone text, opening hours, and Restaurant JSON-LD address, phone, menu URL, and hours with verified business information. The JSON-LD currently uses example address details.
4. Replace the review cards and sample star ratings with genuine, permissioned customer reviews. Do not publish the sample reviews as real endorsements.
5. Replace the sample offer with a current promotion, including its terms and expiry.
6. Replace Unsplash photo URLs in `index.html` and the hero/offer backgrounds in `styles.css` with your own optimized images. Use descriptive alt text for content photos. Use small WebP/AVIF files where possible.
7. Update `og:url`, `og:image`, the page title/description, favicon, social profile link, and brand name.
8. The reservation form opens WhatsApp with a pre-filled request; it does not confirm or store bookings. Confirm requests manually in WhatsApp.

### Placeholder photo inventory

Search `index.html` and `styles.css` for `images.unsplash.com` to find every sample image. Current image IDs include:

- `photo-1414235077428-338989a2e8c0` — hero, dining room, gallery
- `photo-1476224203421-9ac39bcb3327` — vegetable dishes and gallery
- `photo-1547592180-85f173990554` — menu vegetables
- `photo-1532550907401-a500c9a57435` — roast chicken
- `photo-1473093295043-cdd812d0e601` — pasta and gallery
- `photo-1488477181946-6428a0291777` — dessert and gallery
- `photo-1482049016688-2d3e1b311543` — pastry
- `photo-1513558161293-cdab7a9d8efa` — citrus drink
- `photo-1517701550927-30cf4ba1dba5` — coffee
- `photo-1517248135467-4c7edcad34c4` — interior and offer

## Deploy free

### Netlify

1. Push the project to a GitHub repository.
2. In Netlify, choose **Add new site → Import an existing project** and select the repository.
3. Leave the build command and publish directory blank (or set the publish directory to the repository root).
4. Deploy, then update the canonical `og:url` metadata with the published site URL.

### Vercel

1. Push the project to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Select **Other** as the framework preset; no build command is needed, and the output directory is `.`.
4. Deploy, then update the canonical `og:url` metadata with the published site URL.
