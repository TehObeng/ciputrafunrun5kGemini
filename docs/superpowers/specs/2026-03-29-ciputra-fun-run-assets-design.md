# Ciputra Batam Fun Run 2026 Branding And Race-Pack Modal Design

## Goal

Update the single-page event site so the visible event branding reads `Ciputra Batam Fun Run 2026`, add the event name beside the navbar logo, render two logos in the footer, and make the four race-pack images open in a full-image modal.

## Current State

- The page already uses local bundled assets for the fun-run logo, race-pack images, and the CitraLand Megah footer logo.
- Visible event copy still references `Ciputra Fun Run 5K`.
- The navbar shows only the logo image without the full event name beside it.
- The footer shows the event name as text plus only one logo.
- Race-pack images are static cards and cannot be enlarged.

## Approved Scope

- Replace visible `Ciputra Fun Run 5K` branding with `Ciputra Batam Fun Run 2026`.
- Add the text `Ciputra Batam Fun Run 2026` beside the navbar logo.
- Show two footer logos: the fun-run logo and the CitraLand Megah logo.
- Make only the four race-pack images clickable.
- Clicking a race-pack image opens a modal that shows the full image only, centered and uncropped.

## Out Of Scope

- Making the hero background image clickable
- Making the navbar or footer logos clickable
- Changing the event schedule, ticket pricing, CTA links, or map behavior
- Adding captions, thumbnails, or text inside the modal

## Architecture

`src/App.tsx` remains the page entry point and will own both the race-pack image data and the modal open state. A small helper component in the same file will render the overlay so the modal behavior stays isolated without introducing unnecessary file sprawl in this small app.

The modal will be purely client-side state: clicking a race-pack card stores the selected image object in React state, and clearing that state closes the modal. Images continue to come from local Vite asset imports, so no new network dependency is introduced.

## UI Changes

### Navbar

- Keep the existing fun-run logo image.
- Add a text lockup immediately to its right reading `Ciputra Batam Fun Run 2026`.
- Preserve the existing sticky layout and responsive sizing.

### Copy Updates

- Replace visible `Ciputra Fun Run 5K` references with `Ciputra Batam Fun Run 2026`.
- Update related image `alt` text to match the new event name where appropriate.
- Keep all non-branding content, pricing, and schedule copy unchanged.

### Race-Pack Cards

- Keep the current four-card layout and labels.
- Turn each image area into an obvious interactive target without changing the overall grid structure.
- Preserve cropped thumbnails in the grid for layout consistency.

### Image Modal

- Open only from the four race-pack image cards.
- Render on top of a dark semi-opaque backdrop.
- Show the selected image centered with `object-contain` behavior so the full image stays visible and uncropped.
- Show no text content inside the modal.
- Support dismissal by clicking outside the image, pressing a close button, or using the Escape key.

### Footer

- Replace the footer text-only brand lockup with a logo row.
- Show the fun-run logo and the CitraLand Megah logo together in the footer.
- Keep the copyright line.

## Error Handling And Accessibility

- Each interactive race-pack image uses a semantic button so keyboard users can open the modal.
- The modal exposes a close control and Escape-key handling so users can dismiss it reliably.
- The overlay will stop accidental background interaction while open.
- Image `alt` text remains descriptive even though the modal itself contains no captions.

## Testing And Verification

- Update component tests to cover the new visible branding.
- Add a regression test that clicks a race-pack image, confirms the modal image appears, and then closes it.
- Run `npm test`, `npm run lint`, and `npm run build` after implementation.
