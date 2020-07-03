import React from 'react';
import { pokemons } from './mockedData';
import renderWithRouter from '../services/renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('test file Pokemon.js', () => {
  test('Pokemon name should be correct', () => {
    const { getByTestId } = renderWithRouter((
      <Pokemon pokemon={pokemons[2]} isFavorite={false} />
    ));
    expect(getByTestId('pokemon-name').textContent).toBe('Mew');
  });

  test('Pokemon weight should be correct', () => {
    const { getByText } = renderWithRouter((
      <Pokemon pokemon={pokemons[2]} isFavorite={false} />
    ));
    expect(getByText('Average weight:4.0kg')).toBeInTheDocument();
  });

  test('Pokemon image alt should be correct', () => {
    const { getByAltText } = renderWithRouter((
      <Pokemon pokemon={pokemons[2]} isFavorite={false} />
    ));
    const image = getByAltText('Mew sprite');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/4/43/Spr_5b_151.png');
  });

  test('Should contain a link to "/pokemon/id"', () => {
    const { getByText } = renderWithRouter((
      <Pokemon pokemon={pokemons[2]} isFavorite={false} />
    ));
    const detailsLink = getByText('More details');
    expect(detailsLink.href).toMatch(/\/pokemons\/151/);
  });

  test('Pokemon type should be correct', () => {
    const { getByTestId } = renderWithRouter((
      <Pokemon pokemon={pokemons[2]} isFavorite={false} />
    ));
    expect(getByTestId('pokemonType').textContent).toBe('Psychic');
  });

  test('Should contain favorite icon with correct alt', () => {
    const isFavorite = true;
    const { getByAltText } = renderWithRouter((
      <Pokemon pokemon={pokemons[2]} isFavorite={isFavorite} />
    ));
    const img = getByAltText('Mew is marked as favorite');
    expect(img).toBeInTheDocument();
    expect(img.src).toMatch(/\/star-icon.svg/);
  });
});
