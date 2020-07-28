import { fireEvent, within } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const { id, name, type, image, averageWeight: { value, measurementUnit } } = pokemons[0];

describe('Tests - Pokemon.js', () => {
  test('Pokemon Overview', () => {
    const { getByText, getByTestId, container } = renderWithRouter(<App />);
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

  test('More details - route', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetails = getByText('More details');
    expect(moreDetails.getAttribute('href')).toBe(`/pokemons/${id}`);
  });

  test('Pokemon favorite', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const moreDetails = getByText('More details');
    fireEvent.click(moreDetails);
    fireEvent.click(getByText('Pokémon favoritado?'));
    const star = container.querySelector('.favorite-icon');
    expect(star.alt).toBe(`${name} is marked as favorite`);
    expect(star.src).toMatch('/star-icon.svg');
  });
});
