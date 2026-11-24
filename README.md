# Mohamed Aydi: coaching website and birthday surprise

This is a static site for GitHub Pages. It has no build step and no dependencies.

| Path | What it is |
|---|---|
| `/` | His coaching site, in French: hero, manifesto, method (three pillars), who it's for, **Le Labo** (a bulking calorie and macro calculator), gallery, about, and a Calendly booking embed |
| `/joyeux-anniversaire/` | The surprise: an envelope, then a cake (click to blow out the candles), then confetti, polaroids, your letter, and "this site is yours" |
| Secret | **Click the "M.A" logo 5 times quickly** on the main site to open the surprise |

## Before his birthday: personalize

Everything is in the `BIRTHDAY = { … }` object at the bottom of `joyeux-anniversaire/index.html`:

- `age`: the number of candles, and the number written on the cake
- `dateLine`: e.g. `"12 décembre 2026"` (leave it empty to show today's date)
- `message`: your letter (an array of paragraphs)
- `from`: your signature
- `photos`: swap in family photos (put them in `assets/img/` and use the path `../assets/img/your-photo.jpg`)

To preview the message directly, open `/joyeux-anniversaire/#message`.

## Test locally

```bash
python -m http.server 8000
# → http://localhost:8000
```

## Publish on GitHub Pages

```bash
gh repo create moh-aydi --public --source=. --push
gh api repos/{owner}/moh-aydi/pages -X POST -f "source[branch]=main" -f "source[path]=/"
```

The site will be at `https://<your-username>.github.io/moh-aydi/`.
Send him the link `…/moh-aydi/joyeux-anniversaire/` on his birthday.

> On GitHub's free plan, Pages requires a **public** repository. If you publish before his birthday, the surprise page is reachable by anyone who has the link. It isn't indexed (`noindex`), but publish close to the day if you want to stay safe.

## Later

- **Custom domain**: add a `CNAME` file with e.g. `mohamedaydi.com` and configure the DNS.
- **Testimonials / before-and-after**: add a section once he has clients.
- The photos are credited in the gallery (@prateek_it_is, @roeeeeyy, @eunice.rsl).
