import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import About from '../components/About';

afterEach(cleanup);

describe('Testes do arquivo About.js', () => {
  test('A página deve conter um heading h2 com o texto About Pokédex;', () => {
    const { getByText } = renderWithRouter(<About />);
    const heading = getByText(/About Pokédex/i);
    expect(heading).toContainHTML('<h2>About Pokédex</h2>');
  });

  test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const p1 = getByText('This application simulates a Pokédex, a digital encliclopedia containing all Pokémons');
    expect(p1).toBeInTheDocument();
    const p2 = getByText('One can filter Pokémons by type, and see more details for each one of them');
    expect(p2).toBeInTheDocument();
  });

  test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
