# Ciputra Fun Run Asset Refresh Design

## Goal

Replace the website's placeholder visual assets with the user-provided branding and race-pack images from Google Drive while keeping the current page structure and copy intact.

## Current State

- The site has no local image assets in the repository.
- The top navigation uses a `lucide-react` `Activity` icon plus text instead of a real logo.
- The race-pack section lists items with icon bullets instead of product photos.
- The page has no footer logo.

## Approved Scope

Only these assets will be replaced or added:

- Main site logo
- Jersey image
- Medal image
- BIB image
- Bag image
- Footer logo at the very bottom

No other copy, layout sections, or feature behavior changes are in scope.

## Source Asset Mapping

Assets will be downloaded from the shared Google Drive folder and stored locally in the repository.

- `Logo-Fun-Run-5K.png`: primary site logo used in the top navigation
- `Jersey.jpg`: race-pack jersey image
- `medals-+-Lanyard.jpg`: race-pack medal image
- `BIB.jpg`: race-pack bib image
- `Tas Running.jpg`: race-pack bag image
- `CitraLand Megah Warna.png`: footer logo shown at the bottom of the page

## Architecture

The application will move from external or icon-based visuals to local bundled assets served through Vite. Images will live under `src/assets/` and be imported into `src/App.tsx`, which remains the single page component for this repo.

The implementation stays intentionally narrow: only asset storage, asset imports, and the existing JSX markup required to render those images will change. Existing text content, CTA links, and event information remain unchanged.

## UI Changes

### Header Logo

- Replace the blue icon box and adjacent text lockup with `Logo-Fun-Run-5K.png`.
- Keep the header height visually stable so the sticky nav behavior does not change.
- Use responsive sizing so the logo remains legible on desktop and mobile.

### Race-Pack Images

- Replace the four icon rows in the participant pack section with rows that include the corresponding real images.
- Keep each item label:
  - Jersey Eksklusif CitraLand Fun Run
  - Medali Finisher (untuk semua yang menyelesaikan rute)
  - Nomor Dada (Race Bib) dengan Chip Pencatat Waktu
  - Goodie Bag & Lanyard
- Preserve the card-like row styling and ensure images do not distort.

### Footer Logo

- Add a new footer section at the very bottom of the page.
- Display `CitraLand Megah Warna.png` centered in that footer.
- Keep the footer visually simple so it functions as a branding close, not a new content block.

## Data Flow

- Asset files are committed to the repository under `src/assets/`.
- `src/App.tsx` imports those files directly.
- Vite resolves the imports into built asset URLs during development and production build.

No runtime fetches, Drive links, or CMS-style indirection are introduced.

## Error Handling

- The implementation avoids remote image dependencies for these assets, which removes Drive-link failure risk.
- Every image will include descriptive `alt` text.
- Image containers will use bounded dimensions and `object-fit` styling to prevent layout breakage from unexpected image aspect ratios.

## Testing And Verification

- Run the local build after the asset changes to confirm the app compiles with the new image imports.
- Verify there are no unresolved imports or TypeScript errors related to the new assets.
- Check the rendered layout manually in the browser-equivalent build output expectations:
  - header logo renders
  - four race-pack images render
  - footer logo renders
  - mobile and desktop layout stay intact

## Out Of Scope

- Rebranding page copy beyond existing text already present in the repo
- Adding new site sections
- Replacing the hero background image unless requested separately
- Adding more corporate logos outside the new footer logo
