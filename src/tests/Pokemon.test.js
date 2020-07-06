import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('The correct name of the Pokémon should appear on the screen', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName.textContent).toBe('Pikachu');
});

test('The average weight of the Pokémon should be displayed', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const pokemonWeight = getByTestId('pokemon-weight');
  expect(pokemonWeight.textContent).toBe('Average weight:6.0kg');
});

test('The type of Pokémon should be displayed', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const pokemonType = getByTestId('pokemonType');
  expect(pokemonType.textContent).toBe('Electric');
});

test('The image must contain a src attribute with the image URL and alt with the text <name> sprite', () => {
  const { queryByAltText } = renderWithRouter(<App />);
  const pokemonImg = queryByAltText('Pikachu sprite');
  expect(pokemonImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('It must contain a navigation link to view details', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More details/i));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/pokemons/25');
});

test('Favorite Pokémon should display a star icon', () => {
  const { getByText, queryByAltText } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More details/i));
  fireEvent.click(getByText(/Pokémon favoritado?/i));
  const favoriteIcon = queryByAltText('Pikachu is marked as favorite');
  expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
});
