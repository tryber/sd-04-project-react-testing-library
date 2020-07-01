import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

afterEach(cleanup);

describe('2. Tests of the About.js file.', () => {
  test('The "About" page should display information about Pokédex.', () => {
    renderWithRouter(<About />);
    const infoPokedex = screen.getByText(/One can filter Pokémons by type/i);

    expect(infoPokedex).toBeInTheDocument();
  });

  test('The page must contain an heading h2 with the text About Pokédex.', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading');

    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  test('The page must contain two graphics with text about a Pokédex.', () => {
    renderWithRouter(<About />);
    const paragraph = screen.getAllByRole('region');

    expect((paragraph).length).toBe(2);
  });

  test('The page should contain the following image of a Pokédex:', () => {
    renderWithRouter(<About />);
    const image = screen.getByAltText('Pokédex');

    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
