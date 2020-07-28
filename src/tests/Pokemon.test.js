import React from 'react';
import App from '../App';
// import Pokemon from '../components/Pokemon'
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Tests - Pokemon.js', () => {
  test('Pokemon', () => {
    const { getByText, getByTestId, container } = renderWithRouter(<App />);
    const { name, type, image, averageWeight: { value, measurementUnit } } = pokemons[0];
    const pkmName = getByText(name);
    const pkmType = getByTestId('pokemonType');
    const pkmWeight = getByTestId('pokemon-weight');
    expect(pkmName).toBeInTheDocument();
    expect(pkmType.textContent).toBe(type);
    expect(pkmWeight.textContent).toBe(`Average weight:${value}${measurementUnit}`);
    const pkmImg = container.querySelector('div.pokemon img');
    expect(pkmImg.src).toBe(image);
    expect(pkmImg.alt).toBe(`${name} sprite`);
  });
});
