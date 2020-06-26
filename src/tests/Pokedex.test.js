import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import Data from '../data';

const types = Data.map((elem) => elem.type);
// const unitType = types.find(({type}))

describe('Testando o botão de proximo', () => {
  afterEach(cleanup);

  test('Testando o botão de proximo ativo', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const nextPokemon = getByTestId('next-pokemon');
    const firstPokemon = getByTestId('pokemon-name').innerHTML;

    expect(nextPokemon).toBeInTheDocument();
    expect(nextPokemon.disabled).toBe(false);
    fireEvent.click(nextPokemon);

    const secondPokemon = getByTestId('pokemon-name').innerHTML;
    expect(firstPokemon).not.toBe(secondPokemon);
  });

  test('Testando o botão de proximo inativo', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const nextPokemon = getByTestId('next-pokemon');
    const buttons = getAllByTestId('pokemon-type-button');

    fireEvent.click(buttons[2]);
    expect(nextPokemon.disabled).toBe(true);
  });

  test('testando os botoes de tipo', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<App />);
    const buttons = getAllByTestId('pokemon-type-button');

    expect(buttons.length).toBe((types.length - 2));
    buttons.forEach((elem) => {
      const type = types.find((typ) => typ === elem.innerHTML);
      expect(elem.innerHTML).toBe(type);
    });
  });
});

test('Testando os botoes de filtro', () => {});

test('', () => {});
