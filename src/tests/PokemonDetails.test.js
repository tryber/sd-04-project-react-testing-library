import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

afterEach(cleanup);

describe('7. Tests of the PokemonDetails.js file', () => {
  test('testind the route', () => {
    const { history, getByText } = renderWithRouter(<App />, {
      route: `/pokemons/${pokemons[0].id}`,
    });
    history.push(`/pokemons/${pokemons[0].id}`);

    const phrase = getByText(`Game Locations of ${pokemons[0].name}`);
    expect(phrase).toBeDefined();
  });

  test('testing image', () => {
    const { history, getAllByAltText } = renderWithRouter(<App />, {
      route: `/pokemons/${pokemons[0].id}`,
    });
    history.push(`/pokemons/${pokemons[0].id}`);
    const poke = getAllByAltText(`${pokemons[0].name} location`);
    expect(poke[0]).toBeDefined();
    expect(poke[0]).toHaveAttribute('src', `${pokemons[0].foundAt[0].map}`);
  });

  test('testing Summary', () => {
    const { history, getByText } = renderWithRouter(<App />, {
      route: `/pokemons/${pokemons[0].id}`,
    });
    history.push(`/pokemons/${pokemons[0].id}`);

    const sumario = getByText('Summary');
    expect(sumario).toBeDefined();

    const sumarioVar = getByText(`${pokemons[0].summary}`);
    expect(sumarioVar).toBeDefined();
  });
});
