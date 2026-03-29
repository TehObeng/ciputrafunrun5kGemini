# Ciputra Batam Fun Run 2026 Branding And Modal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the page to `Ciputra Batam Fun Run 2026`, add the event name beside the navbar logo, show two logos in the footer, and add a clickable full-image modal for the four race-pack cards.

**Architecture:** Keep the app in `src/App.tsx`, introduce a small modal helper in that file, and manage the selected race-pack image with React state. Expand `src/App.test.tsx` to cover the updated branding plus the race-pack modal open and close behavior before implementing the UI changes.

**Tech Stack:** React 19, Vite 6, TypeScript, Tailwind CSS, Vitest, Testing Library

---

### Task 1: Write The Failing Branding And Modal Tests

**Files:**
- Modify: `src/App.test.tsx`

- [ ] **Step 1: Replace the existing test with branding and modal expectations**

Update `src/App.test.tsx` so it checks the renamed branding, both footer logos, and race-pack modal behavior:

```tsx
import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import App from './App';

describe('App branding and race-pack modal', () => {
  it('renders the updated Ciputra Batam Fun Run 2026 branding and both footer logos', () => {
    render(<App />);

    expect(screen.getByText('Ciputra Batam Fun Run 2026')).toBeInTheDocument();
    expect(screen.getAllByAltText('Logo Ciputra Batam Fun Run 2026')).toHaveLength(2);
    expect(screen.getByAltText('Logo CitraLand Megah')).toBeInTheDocument();
    expect(screen.getByAltText('Jersey eksklusif Ciputra Batam Fun Run 2026')).toBeInTheDocument();
  });

  it('opens and closes the race-pack image modal', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', {name: 'Lihat gambar Jersey Eksklusif'}));

    expect(screen.getByRole('dialog', {name: 'Preview gambar race pack'})).toBeInTheDocument();
    expect(screen.getByAltText('Jersey eksklusif Ciputra Batam Fun Run 2026')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', {name: 'Tutup preview gambar'}));

    expect(screen.queryByRole('dialog', {name: 'Preview gambar race pack'})).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npm test -- src/App.test.tsx`

Expected: FAIL because the current app still renders `Ciputra Fun Run 5K`, has only one footer logo image, and does not expose clickable race-pack modal controls.

### Task 2: Implement The Approved Branding Updates

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add the event name constant and updated race-pack metadata**

Define a shared event-name string and update the race-pack alt text values:

```tsx
const EVENT_NAME = 'Ciputra Batam Fun Run 2026';
```

Use it in the race-pack image array:

```tsx
alt: `Jersey eksklusif ${EVENT_NAME}`,
```

- [ ] **Step 2: Add the navbar text beside the existing logo**

Render the navbar brand as:

```tsx
<div className="flex items-center gap-3">
  <img
    src={logoFunRun}
    alt={`Logo ${EVENT_NAME}`}
    className="h-10 w-auto object-contain sm:h-12"
  />
  <span className="text-sm font-bold leading-tight text-slate-900 sm:text-base">
    {EVENT_NAME}
  </span>
</div>
```

- [ ] **Step 3: Replace visible `Ciputra Fun Run 5K` copy**

Update visible branding instances such as:

```tsx
<h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
  Ciputra Batam <br className="hidden md:block" />
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
    Fun Run 2026
  </span>
</h1>
```

And:

```tsx
<p className="text-lg text-slate-600 mb-8">
  Setiap peserta yang terdaftar akan mendapatkan Race Pack eksklusif {EVENT_NAME}.
</p>
```

- [ ] **Step 4: Show both logos in the footer**

Render the footer logo row with both images:

```tsx
<div className="mt-8 flex flex-wrap items-center justify-center gap-6">
  <img
    src={logoFunRun}
    alt={`Logo ${EVENT_NAME}`}
    className="h-14 w-auto object-contain sm:h-16"
  />
  <img
    src={citralandMegahLogo}
    alt="Logo CitraLand Megah"
    className="h-12 w-auto object-contain sm:h-16"
  />
</div>
```

- [ ] **Step 5: Run the focused test to confirm only the branding test passes further**

Run: `npm test -- src/App.test.tsx`

Expected: the branding assertions move closer to green, but the modal test still fails until the modal behavior exists.

### Task 3: Add The Race-Pack Image Modal

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add modal state and a small preview component**

Add state and a helper component:

```tsx
const [selectedRacePackImage, setSelectedRacePackImage] = React.useState<RacePackImage | null>(null);
```

```tsx
function ImagePreviewModal({
  image,
  onClose,
}: {
  image: RacePackImage | null;
  onClose: () => void;
}) {
  if (!image) {
    return null;
  }

  return (
    <div
      aria-label="Preview gambar race pack"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4"
      role="dialog"
      onClick={onClose}
    >
      <button
        aria-label="Tutup preview gambar"
        className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white"
        onClick={onClose}
        type="button"
      >
        Tutup
      </button>
      <img
        src={image.src}
        alt={image.alt}
        className="max-h-[85vh] max-w-[90vw] object-contain"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}
```

- [ ] **Step 2: Make race-pack image tiles clickable buttons**

Wrap each race-pack thumbnail with a button:

```tsx
<button
  aria-label={`Lihat gambar ${item.label}`}
  className="aspect-square w-full overflow-hidden bg-slate-100 text-left"
  onClick={() => setSelectedRacePackImage(item)}
  type="button"
>
  <img
    src={item.src}
    alt={item.alt}
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
  />
</button>
```

- [ ] **Step 3: Add Escape-key close handling and render the modal**

Add a `useEffect` tied to `selectedRacePackImage`:

```tsx
React.useEffect(() => {
  if (!selectedRacePackImage) {
    return;
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setSelectedRacePackImage(null);
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [selectedRacePackImage]);
```

Render near the end of the component:

```tsx
<ImagePreviewModal
  image={selectedRacePackImage}
  onClose={() => setSelectedRacePackImage(null)}
/>
```

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `npm test -- src/App.test.tsx`

Expected: PASS with both branding and modal tests green.

### Task 4: Run Full Verification

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Modify: `docs/superpowers/specs/2026-03-29-ciputra-fun-run-assets-design.md`
- Modify: `docs/superpowers/plans/2026-03-29-ciputra-fun-run-assets.md`

- [ ] **Step 1: Run the full test suite**

Run: `npm test`

Expected: PASS with all tests green.

- [ ] **Step 2: Run the TypeScript check**

Run: `npm run lint`

Expected: exit code 0.

- [ ] **Step 3: Run the production build**

Run: `npm run build`

Expected: Vite build succeeds and emits the production bundle without asset or type errors.
