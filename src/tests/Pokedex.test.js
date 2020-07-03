import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';
import { Pokedex } from '../components';

// const pokemonTypes = [
//   ...new Set(data.reduce((types, { type }) => [...types, type], [])),
// ];

afterEach(cleanup);

describe('Test Pokedex.js', () => {
  test('Next Pokemon Button', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/' });
    const title = getByText(/Encountered pokémons/i);
    expect(title).toBeInTheDocument();
  });
  
});
