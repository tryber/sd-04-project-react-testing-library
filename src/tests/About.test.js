import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

afterEach(cleanup);

describe('About tests', () => {
  test('About should have an H2 with the text About Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(getByText(/About Pokédex/i)).toBeDefined();
  });

  test('The should contain two paragraphs about the Pokédex.', () => {
    const { container } = renderWithRouter(<About />);
    expect(container.querySelectorAll('p').length).toBe(2);
  });

  test('It should contain an image like the one below.', () => {
    const img = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const { container } = renderWithRouter(<About />);
    expect(container.querySelector('img').src).toBe(img);
  });
});
