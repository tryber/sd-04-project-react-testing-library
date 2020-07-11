import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('Requirement 2', () => {
  it('A página "About" deve exibir informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/about' });
    const heading = getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  it('A página deve conter um heading h2 com o texto About Pokédex;', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/about' });
    const heading = getByText(/About Pokédex/i);
    expect(heading.tagName).toBe('H2');
  });
  it('A página deve conter dois parágrafos com texto sobre a Pokédex;', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/about' });
    const p1 = getByText(/This application simulates a Pokédex/i);
    const p2 = getByText(/One can filter Pokémons by type/i);
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });
  it('A página deve conter a seguinte imagem de uma Pokédex:...', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/about' });
    const img = document.querySelector('img');
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
