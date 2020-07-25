import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

/*
3. Testes do arquivo FavoritePokemons.js
Caso a pessoa não tenha pokémons favoritos,
a mensagem No favorite pokemon found deve aparecer na tela.

A página não deve exibir nenhum card de pokémon não favoritado.

A página deve exibir todos os cards de pokémons favoritados;
*/

describe('Tests FavoritePokemons.js', () => {
  test('No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const text = getByText('No favorite pokemon found');
    expect(text).toBeInTheDocument();
  });
  // test('Favorites Pokemons ', () => {});
});
