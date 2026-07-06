# Kartik Mashal — Portfolio

A single-page portfolio site. No build step, no framework, no dependencies —
just HTML, CSS, and JavaScript, so you can open it, edit it, and deploy it
anywhere without installing anything.

## Folder structure

```
portfolio/
├── index.html              — all page content and structure
├── css/
│   └── style.css           — all styling, colors, layout, responsiveness
├── js/
│   └── script.js           — scroll animations, mobile nav, contact form
├── assets/
│   ├── images/
│   │   └── (add profile.jpg here)
│   └── icons/              — optional, icons are inline SVG by default
├── resume/
│   └── Kartik_Mashal_Resume.pdf   — the file the "Download Résumé" buttons serve
└── README.md                — you are here
```

## 1. Add your photo

Drop a photo into `assets/images/` named exactly `profile.jpg`.
Until you do, a placeholder icon shows automatically — nothing breaks.

Recommended: square or 3:4 crop, at least 600px wide, plain background.

## 2. Replace the résumé

Swap `resume/Kartik_Mashal_Resume.pdf` for your latest exported PDF,
**keeping the same filename** (or update the two `href` references to it
in `index.html` — search for `Kartik_Mashal_Resume.pdf`, there are two:
one in the nav bar, one in the hero).

## 3. Set up the contact form to email you directly

The form works out of the box using your email client (clicking "Send
message" opens a pre-filled email in Mail/Gmail/Outlook) — but if you'd
rather have messages land silently in your inbox without opening
anything, wire up **Formspree** (free, no backend required):

1. Go to **[formspree.io](https://formspree.io)** and create a free account.
2. Create a new form. It gives you an endpoint that looks like:
   `https://formspree.io/f/abcd1234`
3. Open `js/script.js`, find this line near the top:
   ```js
   const FORMSPREE_ENDPOINT = "";
   ```
4. Paste your endpoint between the quotes:
   ```js
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/abcd1234";
   ```
5. Save. Every submission now emails you directly — no mailto popup,
   just a clean "Message sent" confirmation on the page for the visitor.

Formspree's free tier covers 50 submissions/month, which is plenty for
a portfolio site.

## 4. Update your links

Search `index.html` for these and replace with your real ones if they
ever change:
- `github.com/kartikmashal8`
- `linkedin.com/in/kartik-a-mashal-30036219a`
- `instagram.com/` — currently a placeholder link, add your handle
- `kartikmashal8@gmail.com`
- `+91-8088793855`

## 5. Preview it locally

No build step needed — just open `index.html` in a browser. For the
contact form's fetch request to Formspree to work correctly (some
browsers restrict `fetch` on `file://` pages), it's better to serve it
locally instead:

```bash
# Python (already installed on most machines)
cd portfolio
python3 -m http.server 8000
# then open http://localhost:8000
```

or, if you have Node installed:
```bash
npx serve portfolio
```

## 6. Deploy it for free

Any of these work great for a static site like this:

**Netlify (drag and drop, easiest)**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the whole `portfolio` folder onto the page
3. Done — you get a live URL immediately, with a free custom subdomain

**GitHub Pages**
1. Create a new GitHub repo, push this folder's contents to it
2. Repo → Settings → Pages → Source: `main` branch, `/ (root)`
3. Your site is live at `https://yourusername.github.io/reponame`

**Vercel**
1. Go to [vercel.com/new](https://vercel.com/new), import the folder/repo
2. No configuration needed — it auto-detects a static site

## Customizing colors / fonts

Everything visual is controlled by CSS variables at the top of
`css/style.css`, under `:root`. Change `--ios` and `--android` to shift
the whole accent palette; change the three `--font-*` variables (and
the Google Fonts `<link>` in `index.html`'s `<head>`) to swap typefaces.

## Notes on the design

- The "changelog" style in the Experience section deliberately reframes
  your work history as a software release log (`v4.0.0`, `added`,
  `changed`, `fixed` tags) — a nod to being an engineer, and a way to
  make a resume-shaped section feel less like a boring list.
- The animated phone mockups in the hero are pure CSS/HTML, no images —
  they'll always load instantly and stay crisp on any screen size.
- Respects `prefers-reduced-motion` — if a visitor has that OS setting
  on, all animations are disabled automatically.
