import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

afterEach(cleanup);

describe('Teste Favorite Pokemons vazia', () => {
  test('A página "About" deve exibir informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFound = getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });

  test('A página não deve exibir nenhum card de pokémon não favoritado.', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={pokemons.slice(0, 4)} />);
    const pokemon = queryByText(pokemons[5].name);
    expect(pokemon).not.toBeInTheDocument();
  });

  test('A página deve exibir todos os cards de pokémons favoritados', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={pokemons.slice(0, 4)} />);
    const pokemon = queryByText(pokemons[2].name);
    expect(pokemon).toBeInTheDocument();
  });
});
