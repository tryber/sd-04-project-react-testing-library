import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('About', () => {
  test('have a H2 tag with the text "About Pokédex"', () => {
    const { container } = render(<About />);

    expect(container.querySelector('h2').innerHTML).toMatch(/about pokédex/i);
  });

  test('have two paragraphs about pokémon', () => {
    const { container } = render(<About />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
    paragraphs.forEach((p) => expect(p.innerHTML).toMatch(/pokémon/i));
  });

  test('Have the Pokedex Image', () => {
    const { container } = render(<About />);
    expect(container.querySelector('img').src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
