import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('requirement 2', () => {
  test('h2 with `About Pokédex` text', () => {
    const { getByText } = render(<About />);
    const h2 = getByText('About Pokédex');
    expect(h2).toBeInTheDocument();
    expect(h2.tagName).toBe('H2');
  });

  test('2 paragraphs about Pokédex', () => {
    render(<About />);
    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
  });

  test('Pokédex image', () => {
    const { getByAltText } = render(<About />);
    const img = getByAltText('Pokédex');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
