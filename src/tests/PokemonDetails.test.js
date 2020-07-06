import React from 'react';
import renderWithRouter from './helpFunction';
import pokemon from '../data';
import App from '../App';
import pokemons from '../data';

describe('Tests about component', () => {
  test('test page texts', () => {
    const { getAllByRole, getByText } = renderWithRouter(<App />, { route: `/pokemons/${pokemon[0].id}` });
    const h2 = getAllByRole('heading');
    expect(h2[1].innerHTML).toBe(`${pokemon[0].name} Details`);
    expect(h2[2].innerHTML.trim()).toBe('Summary');
    expect(h2[3].innerHTML).toBe(`Game Locations of ${pokemon[0].name}`);
    expect(getByText(pokemons[0].summary)).toBeInTheDocument();
    expect(getByText(/Pokémon favoritado?/i)).toBeInTheDocument();
  });
  test('test page images', () => {
    const { getAllByRole } = renderWithRouter(<App />, { route: `/pokemons/${pokemon[0].id}` });
    const images = getAllByRole('img');
    expect(images[1].alt).toBe(`${pokemon[0].name} location`);
    expect(images[2].alt).toBe(`${pokemon[0].name} location`);
    expect(images[1].src).toBe(pokemon[0].foundAt[0].map);
    expect(images[2].src).toBe(pokemon[0].foundAt[1].map);
  });
});
