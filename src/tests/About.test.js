import React from 'react';
import { cleanup } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

describe('teste da About', () => {
  test('A página "About" deve exibir informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const pokeInfo = getByText(/digital encliclopedia containing all Pokémons/i);
    expect(pokeInfo).toBeInTheDocument();
  });

  test('Testar título About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading');
    expect(heading).toHaveTextContent(/About Pokédex/i);
  });

  test('Testar parágrafos', () => {
    renderWithRouter(<About />);
    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
  });

  test('Testar Imagem', () => {
    const { getByRole } = renderWithRouter(<About />);
    const paragraphs = getByRole('img');
    expect(paragraphs.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
