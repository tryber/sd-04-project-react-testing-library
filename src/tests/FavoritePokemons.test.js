import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritosPokemons from '../components/FavoritePokemons';
import pokemons from '../data';

afterEach(cleanup);

const pokemonName = ['Pikachu', 'Charmander', 'Caterpie'];

const pokemonFavorite = pokemons.filter((item) => pokemonName.includes(item.name));

describe('Testando Pokemons Favoritos', () => {
  test('Testandos Caso a pessoa não tenha pokémons favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritosPokemons />);
    const textAbout = getByText(/No favorite pokemon found/i);
    expect(textAbout).toBeInTheDocument();
  });

  test('Testando a página não deve exibir nenhum card', () => {
    const { queryByText } = renderWithRouter(<FavoritosPokemons pokemons={pokemonFavorite} />);

    expect(queryByText('Ekans', 'Alakazam', 'Mew')).not.toBeInTheDocument();
  });

  test('Testando a página deve exibir todos os cards', () => {
    const { queryByText } = renderWithRouter(<FavoritosPokemons pokemons={pokemonFavorite} />);

    expect(queryByText('Pikachu', 'Charmander', 'Caterpie')).toBeInTheDocument();
  });
});
