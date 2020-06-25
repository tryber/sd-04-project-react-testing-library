import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('About', () => {
  test('have a H2 tag with the text "About Pokédex"', () => {
    const { getByText, getAllByAltText } = render(<About />);

    expect(getByText('About Pokédex').tagName).toBe('H2');
  });

  test('have two paragraphs', () => {
    render(<About />);
    expect(document.querySelectorAll('p').length).toBe(2);
  });

  test('Have the Pokedex Image', () => {
    render(<About />);
    expect(document.querySelector('img').src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
