import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Requisito 3', () => {
  test('Caso a pessoa não tenha pokémons favoritos, a mensagem No favorite pokemon found deve aparecer na tela.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={[]} />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
});
