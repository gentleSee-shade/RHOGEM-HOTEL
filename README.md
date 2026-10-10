# RHOGEM Hotel

## Run locally

Install the dependencies once, then start Vite's development server:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (by default, `http://localhost:3000`). The server and build commands failed when dependencies had not yet been installed; `npm install` resolves that.

## Deploy to GitHub Pages

The `Deploy to GitHub Pages` workflow builds the site and deploys it when changes are pushed to `main`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. After the first successful workflow run, the site is available at `https://gentlesee-shade.github.io/RHOGEM-HOTEL/`.

Hotel images are expected in `public/images`; see [the image list](./public/images/README.txt) for the required filenames. The app shows its designed fallback when an image file is missing.
