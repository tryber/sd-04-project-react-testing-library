import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';

import App from '../App';

// import pokemons from '../data';

afterEach(cleanup);

describe('Testes da página Pokedex', () => {
  it('A Pokédex deve conter botões de filtro', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const arrayBtnType = getAllByTestId(/pokemon-type-button/i);

    arrayBtnType.forEach((btn) => {
      expect(btn).toBeInTheDocument();
    });
  });

  it('Botão All', () => {
    const { getByText } = renderWithRouter(<App />);

    const btnAll = getByText(/All/i);

    expect(btnAll).toBeInTheDocument();
  });

  it('Título Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });

  it('Botão próximo pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const btnNext = getByTestId(/next-pokemon/i);

    expect(btnNext).toBeInTheDocument();

    expect(btnNext.textContent).toBe('Próximo pokémon');
  });
});
