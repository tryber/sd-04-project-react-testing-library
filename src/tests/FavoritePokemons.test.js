import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

const favIds = [25, 4, 23];
const favoritePokemons = pokemons.filter((pokemon) => favIds.includes(pokemon.id));

test('Caso a pessoa não tenha pokémons favoritos, a mensagem No favorite pokemon found deve aparecer na tela', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={[]} />);
  expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
});

test('A página não deve exibir nenhum card de pokémon não favoritado', () => {
  const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={favoritePokemons} />);
  expect(queryByText('Snorlax', 'Dragonair')).not.toBeInTheDocument();
});

test('A página deve exibir todos os cards de pokémons favoritados', () => {
  const { getAllByTestId } = renderWithRouter(<FavoritePokemons pokemons={favoritePokemons} />);
  expect(getAllByTestId('pokemon-name').length).toBe(3);
});
