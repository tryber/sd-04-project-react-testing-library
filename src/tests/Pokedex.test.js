import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon'
import pokemons from '../data';

describe('Testes no arquivo Pokemon', () => {
  afterEach(cleanup);

  test('Deve ser retornado um card com as informações de determinado pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    expect(getB)
  });

  test('A Pokédex deve exibir apenas um pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemon = getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  test('A Pokédex deve conter botões de filtro, e um h2', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<App />);
    const pokemon = getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('pokemons por tipo', () => {
    const { getAllByRole, getByTestId, getByText, getAllByTestId, queryByText } = renderWithRouter(
      <App />,
    );
    const buttons = getAllByRole('button');
    const next = buttons.pop();
    const all = buttons.shift();
    const type = getAllByTestId('pokemon-type-button');
    type.map((label) => {
      fireEvent.click(label);
      expect(getByTestId('pokemonType').innerHTML).toBe(label.innerHTML);
      return null;
    });
    expect(getByText('All')).toBeInTheDocument();
    fireEvent.click(all);
    const pokemon = queryByText(pokemons[0].name);
    expect(pokemon).toBeInTheDocument();
    const array = [0, 2, 3, 5, 6];
    array.map((index) => {
      fireEvent.click(type[index]);
      expect(next.disabled).toBe(true);
      return null;
    });
  });
});
