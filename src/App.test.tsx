import {fireEvent, render, screen, within} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import App from './App';

describe('App branding and race-pack modal', () => {
  it('renders the updated Ciputra Batam Fun Run 2026 branding, hero title, and both footer logos', () => {
    render(<App />);

    const nav = screen.getByRole('navigation');
    const navCta = within(nav).getByRole('link', {name: 'Daftar Sekarang'});
    const medalImage = screen.getByAltText('Medali dan lanyard Ciputra Batam Fun Run 2026');
    const locationMap = screen.getByTitle('Peta lokasi acara');
    const heroSection = screen
      .getByText('Berlari dan nikmati keseruan tanpa batas! Acara lari santai untuk semua kalangan dengan hadiah puluhan juta rupiah.')
      .closest('section');

    expect(heroSection).not.toBeNull();
    expect(screen.getByText('Ciputra Batam Fun Run 2026')).toBeInTheDocument();
    expect(screen.getAllByAltText('Logo Ciputra Batam Fun Run 2026')).toHaveLength(2);
    expect(screen.getByAltText('Logo CitraLand Megah')).toBeInTheDocument();
    expect(screen.getByAltText('Jersey eksklusif Ciputra Batam Fun Run 2026')).toBeInTheDocument();
    expect(within(heroSection!).getByText('Treasure Hunt Fun Run 5K')).toBeInTheDocument();
    expect(within(heroSection!).queryByText('Fun Run 2026')).not.toBeInTheDocument();
    expect(medalImage).toBeInTheDocument();
    expect(screen.getByAltText('Nomor dada BIB Ciputra Batam Fun Run 2026')).toBeInTheDocument();
    expect(screen.getByAltText('Tas running Ciputra Batam Fun Run 2026')).toBeInTheDocument();
    expect(navCta).toHaveClass('shrink-0', 'px-3', 'py-2', 'text-xs', 'sm:px-5', 'sm:py-2.5', 'sm:text-sm');
    expect(medalImage).not.toHaveClass('scale-110', '-translate-y-6');
    expect(screen.getAllByText('Instagram: batamfunrun.id')).toHaveLength(2);
    expect(screen.getAllByText('Whatsapp: +62 853 5151 8858')).toHaveLength(2);
    expect(screen.getAllByRole('link', {name: 'Instagram: batamfunrun.id'})).toHaveLength(2);
    expect(screen.getAllByRole('link', {name: 'Whatsapp: +62 853 5151 8858'})).toHaveLength(2);
    expect(screen.getAllByRole('link', {name: 'Instagram: batamfunrun.id'})[0]).toHaveAttribute('href', 'https://instagram.com/batamfunrun.id');
    expect(screen.getAllByRole('link', {name: 'Whatsapp: +62 853 5151 8858'})[0]).toHaveAttribute('href', 'https://wa.me/6285351518858');
    expect(locationMap).toHaveAttribute(
      'src',
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2063.728570563429!2d104.05843210675899!3d1.1244285816043933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d988e6d3675a01%3A0x49e9d0d995ebd175!2sCitraLand%20Megah!5e1!3m2!1sen!2sid!4v1774855404625!5m2!1sen!2sid',
    );
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
