import React from 'react';
import renderWithRouter from '../services/renderwithRouter';
import App from '../App';
import pokemons from '../data';

describe('Details card', () => {
  test('should only have informations about selected pokemon', () => {
    const { container } = renderWithRouter(<App />, { route: `/pokemons/${pokemons[0].id}` });
    const { name } = pokemons[0];
    const pokemonDetails = container.querySelector('.pokemon-details');

    expect(pokemonDetails).toBeInTheDocument();
    expect(pokemonDetails.querySelector('h2').textContent).toBe(`${name} Details`);
  });

  test('shouldt have a link to details page', () => {
    const { getByText } = renderWithRouter(<App />, { route: `/pokemons/${pokemons[0].id}` });
    const detailsButton = getByText(/More details/i);

    expect(detailsButton).not.toBeInTheDocument();
  });

  test('should have a Summary "H2" subtitle', () => {
    const { getByText } = renderWithRouter(<App />, { route: `/pokemons/${pokemons[0].id}` });
    const subtitle = getByText('Summary');

    expect(subtitle).toBeInTheDocument();
    expect(subtitle.tagName).toBe('H2');
  });

  test('should have a paragraph with pokemon info', () => {
    const { getByText } = renderWithRouter(<App />, { route: `/pokemons/${pokemons[0].id}` });
    const { summary } = pokemons[0];
    const pokemonSummary = getByText(summary);

    expect(pokemonSummary).toBeInTheDocument();
    expect(pokemonSummary.tagName).toBe('P');
  });
});

describe('Maps', () => {
  test('should have a h2 header with text "Game Locations of <name>"', () => {
    const { getByText } = renderWithRouter(<App />, { route: `/pokemons/${pokemons[0].id}` });
    const { name } = pokemons[0];
    const pokemonSummary = getByText(`Game Locations of ${name}`);

    expect(pokemonSummary).toBeInTheDocument();
    expect(pokemonSummary.tagName).toBe('H2');
  });

  test('should have all pokemon locations', () => {
    const { getByText } = renderWithRouter(<App />, { route: `/pokemons/${pokemons[0].id}` });
    const { foundAt } = pokemons[0];

    foundAt.forEach((at) => {
      const location = getByText(at.location);

      expect(location).toBeInTheDocument();
    });
  });

  test('should have all pokemon maps images', () => {
    const { getAllByAltText } = renderWithRouter(<App />, { route: `/pokemons/${pokemons[0].id}` });
    const { name } = pokemons[0];
    const { foundAt } = pokemons[0];

    foundAt.forEach((at) => {
      expect(getAllByAltText(`${name} location`).some(({ src }) => src === at.map)).toBeTruthy();
    });
  });

  test('should allow set pokemon as favorite', () => {
    const { getByLabelText } = renderWithRouter(<App />, {
      route: `/pokemons/${pokemons[0].id}`,
    });
    const favorite = getByLabelText(/pokémon favoritado/i);

    expect(favorite).toBeInTheDocument();
    expect(favorite.type).toBe('checkbox');
  });
});
