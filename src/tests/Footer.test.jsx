import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer Component', () => {

  beforeEach(() => {
    render(<Footer />);
  });

  test('renders the logo and branding text', () => {
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();

    expect(screen.getByText('Made in Nepal 🇳🇵 for Nepali businesses')).toBeInTheDocument();
    expect(screen.getByText('Empowering local shops with modern tools.')).toBeInTheDocument();
  });

  test('renders all quick links correctly', () => {
    const quickLinks = ['Home', 'Features', 'Benefits', 'Contact'];

    quickLinks.forEach(linkText => {
      const linkElement = screen.getByRole('link', { name: linkText });
      expect(linkElement).toBeInTheDocument();
    });
  });

  test('renders the "Connect With Us" section', () => {
    expect(screen.getByRole('heading', { name: /connect with us/i })).toBeInTheDocument();

    expect(screen.getByText('Facebook')).toBeInTheDocument();
    expect(screen.getByText('Instagram')).toBeInTheDocument();
  });

  test('renders the copyright notice', () => {
    const copyright = screen.getByText(/© 2025 HisabKitab. All rights reserved./i);
    expect(copyright).toBeInTheDocument();
  });
});