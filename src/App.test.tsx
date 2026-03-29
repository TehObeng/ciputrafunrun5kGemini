import {fireEvent, render, screen, within} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import App from './App';

describe('App branding and race-pack modal', () => {
  it('renders the updated Ciputra Batam Fun Run 2026 branding and both footer logos', () => {
    render(<App />);

    const nav = screen.getByRole('navigation');
    const navCta = within(nav).getByRole('link', {name: 'Daftar Sekarang'});
    const medalImage = screen.getByAltText('Medali dan lanyard Ciputra Batam Fun Run 2026');

    expect(screen.getByText('Ciputra Batam Fun Run 2026')).toBeInTheDocument();
    expect(screen.getAllByAltText('Logo Ciputra Batam Fun Run 2026')).toHaveLength(2);
    expect(screen.getByAltText('Logo CitraLand Megah')).toBeInTheDocument();
    expect(screen.getByAltText('Jersey eksklusif Ciputra Batam Fun Run 2026')).toBeInTheDocument();
    expect(medalImage).toBeInTheDocument();
    expect(screen.getByAltText('Nomor dada BIB Ciputra Batam Fun Run 2026')).toBeInTheDocument();
    expect(screen.getByAltText('Tas running Ciputra Batam Fun Run 2026')).toBeInTheDocument();
    expect(navCta).toHaveClass('shrink-0', 'px-3', 'py-2', 'text-xs', 'sm:px-5', 'sm:py-2.5', 'sm:text-sm');
    expect(medalImage).toHaveClass('scale-110', '-translate-y-6');
    expect(screen.getAllByText('Instagram: batamfunrun.id')).toHaveLength(2);
    expect(screen.getAllByText('Whatsapp: +62 853 5151 8858')).toHaveLength(2);
  });

  it('opens and closes the race-pack image modal', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', {name: 'Lihat gambar Jersey Eksklusif'}));

    const dialog = screen.getByRole('dialog', {name: 'Preview gambar race pack'});
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByAltText('Jersey eksklusif Ciputra Batam Fun Run 2026')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', {name: 'Tutup preview gambar'}));

    expect(screen.queryByRole('dialog', {name: 'Preview gambar race pack'})).not.toBeInTheDocument();
  });
});
