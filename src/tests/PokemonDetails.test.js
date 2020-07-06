import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('The page must contain a text <name> Details and paragraph with the summary of the pokémon', () => {
  const { getByText } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More details/i));

  const pokemonDetail = getByText('Pikachu Details');
  expect(pokemonDetail).toBeInTheDocument();

  const headSummary = getByText('Summary');
  expect(headSummary).toBeInTheDocument();

  const summaryText = getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
  expect(summaryText).toBeInTheDocument();
});

test('The page must not contain a navigation link to display details', () => {
  const { getByText, queryByRole } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More details/i));
  const detailLink = queryByRole(/More details/i);
  expect(detailLink).not.toBeInTheDocument();
});

test('Deve conter um heading h2 com o texto Game Locations of <name>, exibir todas as localizações do pokémon, e deve conter seus nomes e imagens.', () => {
  const { getByText, getAllByAltText } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More details/i));

  const locationText = getByText('Game Locations of Pikachu');
  expect(locationText).toBeInTheDocument();

  const location1 = getByText('Kanto Viridian Forest');
  expect(location1).toBeInTheDocument();

  const location2 = getByText('Kanto Power Plant');
  expect(location2).toBeInTheDocument();

  const imageLocation1 = getAllByAltText('Pikachu location')[0];
  expect(imageLocation1.src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

  const imageLocation2 = getAllByAltText('Pikachu location')[1];
  expect(imageLocation2.src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
});

test('Must allow favoring a Pokémon', () => {
  const { getByText, getByLabelText } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More details/i));

  const checkFavorite = getByLabelText('Pokémon favoritado?');
  expect(checkFavorite).toBeInTheDocument();
  expect(checkFavorite.type).toBe('checkbox');
});
