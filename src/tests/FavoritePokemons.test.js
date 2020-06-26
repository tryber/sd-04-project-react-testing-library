import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../services/renderWithRouter';
import Data from '../data';

const isPokemonFavoriteById = {
  25: true,
  4: true,
  10: true,
  23: false,
  65: true,
  151: false,
  78: false,
  143: false,
  148: true,
};

const pokemonsFavoritos = Data.filter(({ id }) => isPokemonFavoriteById[id]);
const pokemonsNaoFavoritos = Data.filter(({ id }) => !isPokemonFavoriteById[id]);

test('testando se não exibe nada', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const text = getByText('No favorite pokemon found');

  expect(text).toBeInTheDocument();
});

test('testando se exibe todos os pokemons favoritados', () => {
  const { getAllByTestId } = renderWithRouter(<FavoritePokemons pokemons={pokemonsFavoritos} />, { route: '/favorites' });
  const pokemons = getAllByTestId('pokemon-name') ;

  expect(pokemons.length).toBe(5);
  expect(pokemons[0].innerHTML).not.toBe(pokemonsNaoFavoritos[0].name);
  expect(pokemons[0].innerHTML).toBe(pokemonsFavoritos[0].name);
});
