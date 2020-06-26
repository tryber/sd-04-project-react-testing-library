import React from 'React';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import data from '../data';
import { queryByText } from '@testing-library/react';


const favorite = {
  25: true,
  4: false,
  10: true,
  23: false,
  65: true,
  151: false,
  78: true,
  143: false,
  148: true,
};

const favoritePokemons = data.filter(({ id }) => favorite[id]);
const notFavoritePokemons = data.filter(({ id }) => !favorite[id]);

test('If the person does not have favorite pokémons', () => {
  const { getByText }= renderWithRouter(<FavoritePokemons />);
  const noFav = getByText(/No favorite pokemon found/i);
  expect(noFav).toBeInTheDocument();
});

test('The page should not display any non-favored Pokémon cards', () => {
  const { queryByText } = renderWithRouter(<FavoritePokemons pokedex={favoritePokemons} />,
    { route: '/favorites' });

    notFavoritePokemons.forEach(({ name }) => {
      expect(queryByText(name)).toBeNull();
    });
});

test('The page should display all favorite Pokémon cards', () => {
  const { getByText, container } = renderWithRouter(
    <FavoritePokemons pokemons={favoritePokemons} />,
    { route: '/favorites' });

  const fav = container.querySelectorAll('.favorite-pokemon');
    expect(fav.length).toBe(5);
    favoritePokemons.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
    });
});