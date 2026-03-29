import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

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
