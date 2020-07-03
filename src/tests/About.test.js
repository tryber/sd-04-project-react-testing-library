import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('file About.js', () => {
  test('h2 with "about Pokedex" ', () => {
    const { getByText } = render(<About />);
    const heading = getByText('About Pokédex');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  test('2 paragraphs about Pokedex', () => {
    render(<About />);
    const paragraphs = document.querySelectorAll('P');
    expect(paragraphs.length).toBe(2);
  });

  test('pokedex Image', () => {
    const { getByAltText } = render(<About />);
    const img = getByAltText('Pokédex');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
