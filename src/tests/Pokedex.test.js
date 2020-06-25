import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import data from '../data';

describe('Testes do requisito 5', () => {
  test('Se o botão existe, se mostra o próximo pokemon e se volta ao final', () => {
    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const btn = getByText('Próximo pokémon');
    expect(btn).toBeInTheDocument();
    const pokeId = getByTestId('pokemon-name');
    data.forEach(({ name }) => {
      const thatPoke = getByTestId('pokemon-name').innerHTML;
      expect(thatPoke).toBe(name);
      fireEvent.click(btn);
      const nextPoke = getByTestId('pokemon-name').innerHTML;
      expect(nextPoke).not.toBe(name);
    });
    expect(pokeId.innerHTML).toBe(getByTestId('pokemon-name').innerHTML);
  });

  test('A pokedex deve exibir apenas um pokemon por vez', () => {
    const { getAllByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const detailBtn = getAllByText('More details');
    expect(detailBtn.length).toBe(1);
  });

  test('A pokedex deve conter botões de filtro', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokeType = getAllByTestId('pokemon-type-button')[4];
    expect(pokeType).toBeInTheDocument();
    expect(pokeType).toHaveTextContent('Psychic');
  });

  test('A pokedex deve conter um botão para resetar o filtro', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const btnAll = getByText('All');
    expect(btnAll).toBeInTheDocument();
  });

  test('O botão de Próximo pokémon deve ser desabilitado', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const btn = getByText('Próximo pokémon');
    const btnBug = getByText('Bug');
    fireEvent.click(btnBug);
    expect(btn).toBeDisabled();
  });
});
