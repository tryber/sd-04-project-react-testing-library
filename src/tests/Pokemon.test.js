import React from 'react';
import App from '../App';
// import Pokemon from '../components/Pokemon'
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Tests - Pokemon.js', () => {
  test('Pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const pkmName = getByText(pokemons[0].name);
    expect(pkmName).toBeInTheDocument();
  });
});
