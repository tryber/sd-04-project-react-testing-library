import React from 'react';
import renderWithRouter from '../RenderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import Data from '../data';

const FavoriteById = {
  4: false,
  10: true,
  23: false,
  25: true,
  65: false,
  78: true,
  143: false,
  148: true,
  151: false,
};
const isFavorite = Data.filter(({ id }) => FavoriteById[id]);
const isNotFavorite = Data.filter(({ id }) => !FavoriteById[id]);

describe('Testando favoritos', () => {
  test('Nao tem pokemon favorito', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={[]} />);
    const noFavorite = getByText(/No favorite pokemon found/i);

    expect(noFavorite).toBeInTheDocument();
  });

  test('Nao deve exibir card', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={isFavorite} />);

    isNotFavorite.forEach(({ name }) => {
      expect(queryByText(name)).toBeNull();
    });
  });

  test('Exibir todos os cards favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={isFavorite} />);
    
    isFavorite.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
    });

    expect(isFavorite.length).toBe(4);
  });
});
