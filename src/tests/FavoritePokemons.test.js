import React from 'react';
import renderWithRouter from '../services/renderwithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import Pokemons from '../data';

const mokeFavoritePokemons = () => [25];

const getPokemonsIdsByNames = (names = []) => names
  .map((name) => Pokemons.find((pokemon) => pokemon.name === name).id);

describe('Favorite Pokemons', () => {
  test('should have "No favorite pokemon found" when no favorites', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={[]} />);
    const notFound = getByText(/No favorite pokemon found/i);

    expect(notFound).toBeInTheDocument();
  });

  test('shouldnt render non favorite pokemons', () => {
    const { queryAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={Pokemons.slice(0, 3)} />
    );
    const renderedPokemonsNames = queryAllByTestId('pokemon-name').map(
      (pokemonName) => pokemonName.textContent
    );
    const renderedIds = getPokemonsIdsByNames(renderedPokemonsNames);

    expect(renderedIds).not.toEqual(mokeFavoritePokemons());
  });

  test('should render all favorite pokemons', () => {
    const { queryAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={Pokemons.slice(0, 3)} />
    );
    const renderedPokemonsNames = queryAllByTestId('pokemon-name').map(
      (pokemonName) => pokemonName.textContent
    );
    const renderedIds = getPokemonsIdsByNames(renderedPokemonsNames);

    expect(renderedIds).toEqual(expect.arrayContaining(mokeFavoritePokemons()));
  });
});
