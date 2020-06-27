import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

afterEach(cleanup);

describe('Pokemon tests', () => {
  const favorite = false;
  const pok = pokemons[0];
  const { measurementUnit: measure, value } = pok.averageWeight;
  const img = pok.image;
  test('Should return a pokemon card', () => {
    const { container } = renderWithRouter(
      <Pokemon pokemon={pok} isFavorite={favorite} />,
    );
    expect(container.querySelector('div.pokemon')).toBeDefined();
  });

  test('The name of the pokemon should appear on the screen', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={pok} isFavorite={favorite} />,
    );
    expect(getByTestId('pokemon-name')).toBeDefined();
  });

  test('Return the formatted weight value and unit of measure.', () => {
    const format = `Average weight:${value}${measure}`;
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={pok} isFavorite={favorite} />,
    );
    expect(getByTestId('pokemon-weight').textContent).toBe(format);
  });

  test('The image should contain the src and alt attributes.', () => {
    const { container } = renderWithRouter(
      <Pokemon pokemon={pok} isFavorite={favorite} />,
    );
    expect(container.querySelector('img').src).toBe(img);
    expect(container.querySelector('img').alt).toBe(`${pok.name} sprite`);
  });

  test('Should contain a link to details.', () => {
    const { container } = renderWithRouter(
      <Pokemon pokemon={pok} isFavorite={favorite} />,
    );
    const path = `/pokemons/${pok.id}`;
    expect(container.querySelector('a').href.includes(path)).toBeTruthy();
  });

  test('The link takes you to the details page.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    expect(history.location.pathname).toBe(`pokemons/${pok.id}`);
  });

  test('Favorite pokemons have a start in the card.', () => {
    const isFavorite = true;
    pokemons.forEach((pokemon) => {
      const { container } = renderWithRouter(
        <Pokemon pokemon={pokemon} isFavorite={isFavorite} />,
      );
      const path = '/star-icon.svg';
      expect(container.querySelector('.favorite-icon').src.includes(path)).toBeTruthy();
      expect(container.querySelector('.favorite-icon').alt)
        .toBe(`${pokemon.name} is marked as favorite`);
    });
  });
});
