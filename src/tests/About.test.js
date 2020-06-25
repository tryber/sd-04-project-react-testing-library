import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('it tests title, paragraphs and image in About page', () => {
  const { getByText, getByAltText } = render(<About />);
  const heading = getByText(/About Pokédex/i);
  expect(heading).toBeInTheDocument();
  const p1 = getByText(/This application simulates/i);
  expect(p1).toBeInTheDocument();
  const p2 = getByText(/One can filter Pokémons/i);
  expect(p2).toBeInTheDocument();
  const img = getByAltText('Pokédex');
  expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/' +
  '800px-Gen_I_Pok%C3%A9dex.png');
});
