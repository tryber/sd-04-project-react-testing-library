import React from 'react';
import { cleanup, render } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

afterEach(cleanup);

const favoriteIds = [25, 4, 10]
const favoritePokemons = pokemons.filter((item) => favoriteIds.includes(item.id));

it('should render "No favorite pokemon found" if the user doesn\'t have any', () => {
  const { getByText } = render(<FavoritePokemons pokemons={[]} />);
  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});

it('should not render pokemons not favorited by the user', () => {
  const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={favoritePokemons} />);
  expect(queryByText('Ekans', 'Alakazam', 'Mew')).not.toBeInTheDocument();
});

it('should render pokemons favorited by the user', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={favoritePokemons} />);

  expect(getByText('Pikachu', 'Charmander', 'Caterpie')).toBeInTheDocument();
});