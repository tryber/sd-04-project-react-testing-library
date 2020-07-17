import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const mock = () => [10];

test('Caso a pessoa não tenha pokémons favoritos, a mensagem `No favorite pokemon found` deve aparecer na tela', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={[]} />, { route: '/favorites' });
  const text = getByText(/No favorite pokemon found/i);

  expect(text).toBeInTheDocument();
});

test('A página não deve exibir nenhum card de pokémon não favoritado', () => {
  const { queryByText } = renderWithRouter(
    <FavoritePokemons pokemons={mock()} />,
    { route: '/favorites' },
  );
  expect(queryByText).not.toEqual(mock());
});

test('A página deve exibir todos os cards de pokémons favoritados', () => {
  const { getByText } = renderWithRouter(
    <FavoritePokemons pokemons={mock} />,
    { route: '/favorites' },
  );
  expect(getByText).toBeInTheDocument();
});
