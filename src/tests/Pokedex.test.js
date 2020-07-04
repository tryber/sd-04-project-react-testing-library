import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';

import App from '../App';

afterEach(cleanup);

describe('Testes da página Pokedex', () => {
  it('A Pokédex deve conter botões de filtro', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const arrayBtnType = getAllByTestId(/pokemon-type-button/i);

    arrayBtnType.forEach((btn) => {
      expect(btn).toBeInTheDocument();
    });

    expect(arrayBtnType[0].textContent).toBe('Electric');
    expect(arrayBtnType[1].textContent).toBe('Fire');
    expect(arrayBtnType[2].textContent).toBe('Bug');
    expect(arrayBtnType[3].textContent).toBe('Poison');
    expect(arrayBtnType[4].textContent).toBe('Psychic');
    expect(arrayBtnType[5].textContent).toBe('Normal');
    expect(arrayBtnType[6].textContent).toBe('Dragon');
  });

  it('Botão All', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    const btnAll = getByText(/All/i);

    expect(btnAll).toBeInTheDocument();

    fireEvent.click(btnAll);

    expect(getByText(/Pikachu/i)).toBeInTheDocument();

    expect(getByTestId(/next-pokemon/i).disabled).toBe(false);
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
