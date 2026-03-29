# Ciputra Fun Run Assets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the website logo and race-pack placeholder images with the approved Google Drive assets, then add the corporate footer logo.

**Architecture:** Store the approved files under `src/assets/`, import them directly into `src/App.tsx`, and render them in the existing header, race-pack grid, and new footer section. Validate the behavior with a focused component test plus TypeScript and production build verification.

**Tech Stack:** React 19, Vite 6, TypeScript, Tailwind CSS, Vitest, Testing Library

---

### Task 1: Add Test Harness And Write The Failing UI Test

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`
- Create: `src/App.test.tsx`
- Create: `src/setupTests.ts`

- [ ] **Step 1: Add test dependencies and scripts**

Update `package.json` to add a `test` script and these dev dependencies:

```json
"scripts": {
  "dev": "vite --port=3000 --host=0.0.0.0",
  "build": "vite build",
  "preview": "vite preview",
  "clean": "rm -rf dist",
  "lint": "tsc --noEmit",
  "test": "vitest run"
},
"devDependencies": {
  "@testing-library/jest-dom": "^6.6.3",
  "@testing-library/react": "^16.1.0",
  "@types/express": "^4.17.21",
  "@types/node": "^22.14.0",
  "autoprefixer": "^10.4.21",
  "jsdom": "^25.0.1",
  "tailwindcss": "^4.1.14",
  "tsx": "^4.21.0",
  "typescript": "~5.8.2",
  "vite": "^6.2.0",
  "vitest": "^2.1.8"
}
```

- [ ] **Step 2: Add Vitest config to Vite**

Update `vite.config.ts` to include a `test` block:

```ts
test: {
  environment: 'jsdom',
  setupFiles: './src/setupTests.ts',
},
```

- [ ] **Step 3: Add test setup file**

Create `src/setupTests.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 4: Write the failing asset-rendering test**

Create `src/App.test.tsx`:

```tsx
import {render, screen} from '@testing-library/react';
import App from './App';

describe('App asset rendering', () => {
  it('renders the approved local branding and race-pack images', () => {
    render(<App />);

    expect(screen.getByAltText('Logo Ciputra Fun Run 5K')).toBeInTheDocument();
    expect(screen.getByAltText('Jersey eksklusif Ciputra Fun Run 5K')).toBeInTheDocument();
    expect(screen.getByAltText('Medali dan lanyard Ciputra Fun Run 5K')).toBeInTheDocument();
    expect(screen.getByAltText('Nomor dada BIB Ciputra Fun Run 5K')).toBeInTheDocument();
    expect(screen.getByAltText('Tas running Ciputra Fun Run 5K')).toBeInTheDocument();
    expect(screen.getByAltText('Logo CitraLand Megah')).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Run the test to verify it fails**

Run: `npm test -- --runInBand`

Expected: FAIL because the current app does not render the required logo and footer image alt texts.

### Task 2: Add The Approved Local Image Assets

**Files:**
- Create: `src/assets/logo-fun-run-5k.png`
- Create: `src/assets/jersey.jpg`
- Create: `src/assets/medals-and-lanyard.jpg`
- Create: `src/assets/bib.jpg`
- Create: `src/assets/tas-running.jpg`
- Create: `src/assets/citraland-megah-warna.png`

- [ ] **Step 1: Create the asset directory**

Run: `mkdir -p src/assets`

Expected: `src/assets` exists.

- [ ] **Step 2: Download the approved assets from Google Drive**

Run:

```bash
curl -L 'https://drive.google.com/uc?export=download&id=1y51YpoRMKjTEIiDBfJcJGivw63aJaLCA' -o 'src/assets/logo-fun-run-5k.png'
curl -L 'https://drive.google.com/uc?export=download&id=1XrtyMkDuEZb258riRdyQErQzrpUmAvB-' -o 'src/assets/jersey.jpg'
curl -L 'https://drive.google.com/uc?export=download&id=1gYpqLxzGsLLaRYmgFuYCrAao7kUUlsDG' -o 'src/assets/medals-and-lanyard.jpg'
curl -L 'https://drive.google.com/uc?export=download&id=10h7wckoF44HTwbqYy1qprtRm0a40BNWh' -o 'src/assets/bib.jpg'
curl -L 'https://drive.google.com/uc?export=download&id=140zCj8d50E0xqse2xPZ0yMvUYtAxWtW0' -o 'src/assets/tas-running.jpg'
curl -L 'https://drive.google.com/uc?export=download&id=1mbZJY8HIBICMmKGwh1Lay55H3KRQVQ-J' -o 'src/assets/citraland-megah-warna.png'
```

Expected: all six files exist under `src/assets/`.

### Task 3: Replace Remote And Icon-Based UI With Local Assets

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Import the local assets**

Add these imports near the top of `src/App.tsx`:

```ts
import logoFunRun from './assets/logo-fun-run-5k.png';
import jerseyImage from './assets/jersey.jpg';
import medalImage from './assets/medals-and-lanyard.jpg';
import bibImage from './assets/bib.jpg';
import bagImage from './assets/tas-running.jpg';
import citralandMegahLogo from './assets/citraland-megah-warna.png';
```

- [ ] **Step 2: Replace the header lockup with the approved logo**

Update the nav-brand block to render the local image:

```tsx
<div className="flex items-center">
  <img
    src={logoFunRun}
    alt="Logo Ciputra Fun Run 5K"
    className="h-10 w-auto sm:h-12"
  />
</div>
```

- [ ] **Step 3: Replace the race-pack remote images**

Render the four approved local images with these alt texts:

```tsx
[
  {
    image: jerseyImage,
    alt: 'Jersey eksklusif Ciputra Fun Run 5K',
    label: 'Jersey Eksklusif',
  },
  {
    image: medalImage,
    alt: 'Medali dan lanyard Ciputra Fun Run 5K',
    label: 'Medali Finisher',
  },
  {
    image: bibImage,
    alt: 'Nomor dada BIB Ciputra Fun Run 5K',
    label: 'Nomor Dada (BIB)',
  },
  {
    image: bagImage,
    alt: 'Tas running Ciputra Fun Run 5K',
    label: 'Goodie Bag',
  },
]
```

- [ ] **Step 4: Add the footer logo at the bottom**

Append a footer section near the end of the component:

```tsx
<footer className="border-t border-slate-200 bg-white py-10">
  <div className="mx-auto flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
    <img
      src={citralandMegahLogo}
      alt="Logo CitraLand Megah"
      className="h-12 w-auto sm:h-16"
    />
  </div>
</footer>
```

- [ ] **Step 5: Run the focused test to verify it passes**

Run: `npm test -- --runInBand`

Expected: PASS with the asset-rendering test green.

### Task 4: Run Full Verification

**Files:**
- Modify: `package-lock.json`

- [ ] **Step 1: Install the new test dependencies**

Run: `npm install`

Expected: install completes and writes the updated lockfile.

- [ ] **Step 2: Run the TypeScript check**

Run: `npm run lint`

Expected: exit code 0.

- [ ] **Step 3: Run the production build**

Run: `npm run build`

Expected: Vite build succeeds with no unresolved asset import errors.
