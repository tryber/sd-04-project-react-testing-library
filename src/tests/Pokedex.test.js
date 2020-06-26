import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testando o botão de proximo', () => {
  afterEach(cleanup);

  const { getByTestId } = renderWithRouter(<App />);
  const nextPokemon = getByTestId('next-pokemon');

  test('Testando o botão de proximo ativo', () => {
    const firstPokemon = getByTestId('pokemon-name').innerHTML;

    expect(nextPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemon);

    const secondPokemon = getByTestId('pokemon-name').innerHTML;
    expect(firstPokemon).not.toBe(secondPokemon);
  });

  test('Testando o botão de proximo inativo', () => {

  });
});

test('Testando o botão de proximo', () => {});

test('Testando os botoes de filtro', () => {});

test('', () => {});
