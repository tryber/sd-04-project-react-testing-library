import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Favorite Pokemons', () => {
  test('Caso a pessoa não tenha pokémons favoritos, a mensagem `No favorite pokemon found` deve aparecer na tela.', () => {
    const { getByText } = render(<FavoritePokemons />);
    const notFavorite = getByText(/No favorite pokemon found/i);
    expect(notFavorite).toBeInTheDocument();
  });
});
