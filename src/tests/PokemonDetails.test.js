import React from 'react';
import renderWithRouter from '../utils/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('It should contain information about the selected Pokémon', () => {
  test('The page must contain a text <name> Details, where <name> is the name of the pokémon', () => {
    const { getByText } = renderWithRouter(<App />, { route: `/pokemons/${pokemons[0].id}` });
    expect(getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
  });

  test('The Pokémon displayed on the details page must not contain a navigation link to display details of this Pokémon', () => {
    const { queryByText } = renderWithRouter(<App />, { route: `/pokemons/${pokemons[0].id}` });
    expect(queryByText(/More Details/i)).not.toBeInTheDocument();
  });

  test('The details section must contain an heading h2 with the text Summary', () => {
    const { getByText } = renderWithRouter(<App />, { route: `/pokemons/${pokemons[0].id}` });
    expect(getByText('Summary').tagName).toBe('H2');
  });

  test('The details section should contain a paragraph with the summary of the specific Pokémon being viewed', () => {
    const { getByText } = renderWithRouter(<App />, { route: `/pokemons/${pokemons[0].id}` });
    expect(getByText(`${pokemons[0].summary}`)).toBeInTheDocument();
  });
});

describe('The details page should display a section with the maps with the locations of the pokémon', () => {
  test('The details section must contain an heading h2 with the text Game Locations of <name>, where <name> is the name of the displayed Pokémon', () => {
    const { getByText } = renderWithRouter(<App />, { route: `/pokemons/${pokemons[0].id}` });
    expect(getByText(`Game Locations of ${pokemons[0].name}`));
  });

  test('Each location should display the location name and an image of the location map', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />, { route: `/pokemons/${pokemons[0].id}` });
    expect(getAllByAltText(`${pokemons[0].name} location`).length).toBe(2);
    const imgs = getAllByAltText(`${pokemons[0].name} location`);
    imgs.forEach((mapa) => {
      expect(
        mapa.src === 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png' || mapa.src === 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      ).toBe(true);
    });
    expect(getByText('Kanto Viridian Forest')).toBeDefined();
    expect(getByText('Kanto Power Plant')).toBeDefined();
  });

  test('The details page should allow you to favor a Pokémon', () => {
    const { getByText } = renderWithRouter(<App />, { route: `/pokemons/${pokemons[0].id}` });
    expect(getByText(/Pokémon favoritado?/i)).toBeDefined();
  });
});
