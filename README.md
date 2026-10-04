# Narrated Webflow Cloud guide — GitHub Pages package

A Next.js landing page with synchronized narration and two-way section navigation. Includes the latest navigation fixes and viewport sizing changes.

## Deploy with GitHub Actions

1. Extract this ZIP. Put its contents in your GitHub repository's root on the `main` branch. Include `.github/workflows/deploy-pages.yml`, not just the visible folders. Merge the files into an existing repository without removing unrelated projects. This workflow expects the Next.js app at the repository root.
2. In the repository, open **Settings → Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Open **Actions → Deploy narrated guide to GitHub Pages → Run workflow**, select `main`, and run it. Later pushes to `main` deploy automatically.
4. When the workflow completes, open the URL displayed by the deployment job or **Settings → Pages**.

The workflow installs the locked dependencies, builds `out/`, uploads it, and deploys it with GitHub's Pages actions. It requires no personal access token or additional secrets.

GitHub Pages must be available for your repository and account. If the first run says Pages is not enabled, complete step 2 and run the workflow again. If your default branch has another name, change `branches: [main]` in the workflow.

## Repository paths and custom domains

The workflow reads the site's base path from `actions/configure-pages` and passes it to `NEXT_PUBLIC_BASE_PATH` when building. It supports project URLs such as `https://OWNER.github.io/REPOSITORY/`, account sites, and configured custom domains. The app prefixes its audio, captions, favicon, and Next.js bundles with the same path.

Configure a custom domain in **Settings → Pages**, then rerun the workflow so the build uses the updated path.

## Run locally

Use Node.js 24 and npm:

```sh
npm ci
npm run dev
```

Open http://localhost:4173. The local development site uses the domain root by default.

## Build manually

For a domain-root deployment:

```sh
npm run build
```

For a project repository called `my-repository`, build with `NEXT_PUBLIC_BASE_PATH=/my-repository`:

```sh
# macOS / Linux
NEXT_PUBLIC_BASE_PATH=/my-repository npm run build
```

```powershell
# Windows PowerShell
$env:NEXT_PUBLIC_BASE_PATH = '/my-repository'
npm run build
```

The static files are exported to `out/`. Deploy the **contents** of `out/`, including `.nojekyll` and `_next/`. Keep `.nojekyll` if publishing from a branch. The base path is baked into the build; rebuild if the repository path changes. The included Actions workflow is the recommended way to deploy.

This package contains the source, audio, and automated build workflow. It does not contain a compiled site tied to an assumed repository name. No Next.js server is required on GitHub Pages.

## Edit the guide

- `lib/content.ts`: narration timestamps, chapters, and section copy.
- `components/Guide.tsx`: audio loading, seeking, and navigation.
- `components/FitVisual.tsx`: fits diagrams within the available desktop viewport.
- `components/Visuals.tsx`: section diagrams and visual examples.
- `app/globals.css`: responsive typography, layout, and motion.
- `lib/assets.ts`: prefixes public assets for repository deployments.
- `public/captions.json`: timed captions.
- `public/narration-seekable.m4a`: included narration.

## Included behavior

Playback follows the content. Selecting a section, a chapter, or Previous/Next seeks to the matching narration. Manual scrolling pauses and selects the corresponding audio position. The player includes scrubbing, captions, speed controls, mute, auto-follow, and reduced-motion support.

The narration is downloaded once as a Blob so seeking does not rely on HTTP Range responses. Loading or delayed seek events cannot overwrite the selected section; the latest selection wins.

## Reference documentation

- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)
- [Next.js basePath](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath)
