# Mohamed Aydi: coaching website

This is a static site for GitHub Pages. It has no build step and no dependencies.

Live: https://kash-talel.github.io/moh-aydi/

The site is in French. Its sections, in order:

1. **Hero**
2. **Manifesto:** hovering over the key words shows a photo next to the cursor (desktop only).
3. **The method:** three pillars.
4. **Mouvement:** the section stays pinned while scrolling moves through the 5 studio photos, each paired with a word.
5. **Who it's for**
6. **Ton profil:** a 4-question quiz that gives one of 4 profiles, each with three priorities.
7. **Le Labo:** a bulking calorie and macro calculator.
8. **Planche contact:** the film-shoot gallery, styled as a contact sheet, with a full-screen viewer.
9. **About**
10. **Coulisses:** behind-the-scenes training videos.
11. **The Skool community**
12. **FAQ**
13. **Calendly booking**

There's also a separate legal page at `/mentions-legales/`.

## Still to fill in

- **`mentions-legales/index.html`:** the legal-status details, SIRET number, address and email (the orange placeholders).
- **Later:** offers and prices, email collection, the custom domain, and the Skool link (see below).

## Connecting the Skool community

In `index.html`, find the `<section class="community" …>` and paste the community's link into `data-skool-url`:

```html
<section class="community section" id="communaute" data-skool-url="https://www.skool.com/your-group">
```

- **Empty (the default):** the button says "Être prévenu du lancement" ("Get notified at launch") and points to his Instagram.
- **Filled in:** the button becomes "Rejoindre la communauté" ("Join the community"), it opens Skool, and a "Skool" link appears in the footer.

## Test locally

```bash
python -m http.server 8000
# → http://localhost:8000
```

## Publishing

Every `git push` to `main` updates the site within 1 to 2 minutes.

## Later

- **Custom domain:** add a `CNAME` file containing, for example, `mohamedaydi.com`, and configure the DNS.
- **Testimonials / before-and-after:** add a section once he has clients.
- The photos are credited in the gallery (@prateek_it_is, @roeeeeyy, @eunice.rsl).
