import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';
import { Pokemon } from '../components';


test('A card with the information of a specific Pokémon must be returned', () => {
  const { getByText, getByTestId, getByAltText } = renderWithRouter(<App />);
  expect(getByTestId('pokemon-name').innerHTML).toBe(data[0].name);
  expect(getByTestId('pokemonType').innerHTML).toBe(data[0].type);
  expect(getByTestId('pokemon-weight').innerHTML).toBe(
    `Average weight:${data[0].averageWeight.value}${data[0].averageWeight.measurementUnit}`
  );
  expect(getByAltText(`${data[0].name} sprite`)).toHaveAttribute('src', data[0].image);
  const moreDetails = getByText(/More details/i);
  expect(moreDetails.getAttribute('href')).toBe(`/pokemons/${data[0].id}`);
});

test('Favorite Pokémon should display a star icon', () => {
  const { getByAltText } = renderWithRouter(<Pokemon pokemom={data[0]}isFavorite />);
  expect(getByAltText(`${data[0].name}is marked as favorite`)).toHaveAttribute('src', '/star-icon.svg');
});