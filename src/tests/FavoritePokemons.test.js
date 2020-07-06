import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('Test if message `No favorite pokemon found` appears', () => {
  const { getByText } = render(<FavoritePokemons />);
  const noFavorite = getByText('No favorite pokemon found');
  expect(noFavorite).toBeInTheDocument();
});

test('The page should not display any non-favored Pokémon cards', () => {
  const { getByText, queryByText } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More details/i));
  fireEvent.click(getByText(/Pokémon favoritado?/i));
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const pikachu = getByText(/Pikachu/i);
  const charmander = queryByText(/Charmander/i);
  expect(pikachu).toBeInTheDocument();
  expect(charmander).toBeNull();
});
