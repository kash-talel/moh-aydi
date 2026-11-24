# Mohamed Aydi: coaching website

This is a static site for GitHub Pages. It has no build step and no dependencies.

Live: https://kash-talel.github.io/moh-aydi/

The site is in French. Its sections are: hero, manifesto, the method (three pillars), who it's for, **Le Labo** (a bulking calorie and macro calculator), the Skool community, a gallery, about, and a Calendly booking embed.

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
