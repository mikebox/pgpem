# pgpem.in

Static site for PGPEM, IIM Bangalore, deployed to GitHub Pages at https://pgpem.in/ by `.github/workflows/static.yml` on every push to `main`.

- `index.html` is the root landing page with event blocks.
- `drishti-2026/` holds the Drishti 2026 conference site (`index.html`, session pages, `session.css`, `session.js`).
- `images/` holds shared assets: logos, favicons, photos and link-preview images.

## Every page must include

When adding any new HTML page, put the following at the top of `<head>`, immediately after `<meta charset>`.

1. The Google Analytics tag, verbatim:

   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-N02T4JXVV4"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());

     gtag('config', 'G-N02T4JXVV4');
   </script>
   ```

2. Link-preview tags: `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image` (with width 1200 and height 630), `og:image:alt`, and the matching `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description` and `twitter:image`. URLs must be absolute under `https://pgpem.in/`. Drishti pages use `images/og-drishti.jpg`, and other pages use `images/og-pgpem.jpg` unless they have their own.

3. Favicon links, with paths relative to the page:

   ```html
   <link rel="icon" href="favicon.ico" sizes="any"><link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32.png"><link rel="apple-touch-icon" href="images/apple-touch-icon.png">
   ```

Keep these tags near the top of the file. WhatsApp and other preview crawlers read only the start of a page, and `drishti-2026/index.html` is large because of its inline base64 images.

## Branding

- Palette: cream `#fff1d6`, red `#c11720`, navy `#0c3249`, sky `#679cbc`. Fonts: Inter, with Instrument Serif italic for accents.
- When naming the audience, always list working professionals before MBA students.
- The IIMB PGPEM logo is `images/iimb-pgpem.png`. Everywhere except the Drishti hero banner (where it sits directly on cream), place it on a white panel (the `.ilg` class), including in the vision game share card.
