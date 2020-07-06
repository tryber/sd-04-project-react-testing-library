import React from 'react';
// import { fireEvent, getByTestId } from '@testing-library/react';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { fireEvent } from '@testing-library/react';
// test('', () => {});

describe('Testes do arquivo Pokemon.js', () => {
  test('correct name', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toMatch(pokemons[0].name);
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType.innerHTML).toMatch(pokemons[0].type);
  });

  test('correct weight and measurement unit', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const weight = getByTestId('pokemon-weight');
    expect(weight.innerHTML).toMatch(
      `Average weight:${pokemons[0].averageWeight.value}${pokemons[0].averageWeight.measurementUnit}`
    );
  });

  test('correct image', () => {
    const { getByAltText } = renderWithRouter(<App />);
    const picture = getByAltText(`${pokemons[0].name} sprite`);
    expect(picture.src).toBe(pokemons[0].image);
  });

  test('nav link for details', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More Details/i));
    expect(history.location.pathname).toMatch(`/pokemons/${pokemons[0].id}`);
  });

  test('show favorites with a star', () => {
    const favoriteId = [25];
    window.localStorage.setItem('favoritePokemonIds', JSON.stringify(favoriteId));
    const { getByAltText } = renderWithRouter(<App />);
    const favoritePic = getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favoritePic.src).toMatch('/star-icon.svg');
  });
});
