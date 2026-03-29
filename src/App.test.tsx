import {fireEvent, render, screen, within} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import App from './App';

describe('App branding and race-pack modal', () => {
  it('renders the updated Ciputra Batam Fun Run 2026 branding and both footer logos', () => {
    render(<App />);

    const nav = screen.getByRole('navigation');
    const navCta = within(nav).getByRole('link', {name: 'Daftar Sekarang'});
    const jerseyImage = screen.getByAltText('Jersey eksklusif Ciputra Batam Fun Run 2026');
    const medalImage = screen.getByAltText('Medali dan lanyard Ciputra Batam Fun Run 2026');
    const routeMapImage = screen.getByAltText('Peta Rute 5K');
    const heroSection = screen
      .getByText('Berlari dan nikmati keseruan tanpa batas! Acara lari santai untuk semua kalangan dengan hadiah puluhan juta rupiah.')
      .closest('section');

    expect(heroSection).not.toBeNull();

    expect(screen.getByText('Ciputra Batam Fun Run 2026')).toBeInTheDocument();
    expect(screen.getAllByAltText('Logo Ciputra Batam Fun Run 2026')).toHaveLength(2);
    expect(screen.getByAltText('Logo CitraLand Megah')).toBeInTheDocument();
    expect(within(heroSection!).getByAltText('Logo CiptaLand Megah Batam')).toBeInTheDocument();
    expect(within(heroSection!).getByText('Organized By :')).toBeInTheDocument();
    expect(within(heroSection!).getByAltText('Logo Phoenix Event Batam')).toBeInTheDocument();
    expect(within(heroSection!).queryByText('CiptaLandMegahBatam')).not.toBeInTheDocument();
    expect(within(heroSection!).queryByText('Organized By Phoenix Event Batam')).not.toBeInTheDocument();
    expect(within(heroSection!).queryByText('Ciputra Batam')).not.toBeInTheDocument();
    expect(jerseyImage).toBeInTheDocument();
    expect(medalImage).toBeInTheDocument();
    expect(screen.getByAltText('Nomor dada BIB Ciputra Batam Fun Run 2026')).toBeInTheDocument();
    expect(screen.getByAltText('Tas running Ciputra Batam Fun Run 2026')).toBeInTheDocument();
    expect(routeMapImage).toBeInTheDocument();
    expect(routeMapImage).not.toHaveAttribute('src', expect.stringContaining('images.unsplash.com'));
    expect(navCta).toHaveClass('shrink-0', 'px-3', 'py-2', 'text-xs', 'sm:px-5', 'sm:py-2.5', 'sm:text-sm');
    expect(jerseyImage).toHaveClass('scale-[1.2]');
    expect(medalImage).not.toHaveClass('scale-110', '-translate-y-6');
    expect(screen.getAllByText('Instagram: batamfunrun.id')).toHaveLength(2);
    expect(screen.getAllByText('Whatsapp: +62 853 5151 8858')).toHaveLength(2);
    expect(screen.getAllByRole('link', {name: 'Instagram: batamfunrun.id'})).toHaveLength(2);
    expect(screen.getAllByRole('link', {name: 'Whatsapp: +62 853 5151 8858'})).toHaveLength(2);
    expect(screen.getAllByRole('link', {name: 'Instagram: batamfunrun.id'})[0]).toHaveAttribute('href', 'https://instagram.com/batamfunrun.id');
    expect(screen.getAllByRole('link', {name: 'Whatsapp: +62 853 5151 8858'})[0]).toHaveAttribute('href', 'https://wa.me/6285351518858');
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
