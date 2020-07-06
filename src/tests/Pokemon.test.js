import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './helpFunction';
import pokemon from '../data';
import App from '../App';

describe('Pokemon component test', () => {
  test('pokemon weight test', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const weight = getByTestId(/pokemon-weight/i);
    expect(weight.innerHTML).toBe(`Average weight:${pokemon[0].averageWeight.value}${pokemon[0].averageWeight.measurementUnit}`);
  });
  test('pokemon name test', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const name = getByTestId(/pokemon-name/i);
    expect(name.innerHTML).toBe(pokemon[0].name);
  });
  test('pokemon type test', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const type = getByTestId(/pokemonType/i);
    expect(type.innerHTML).toBe(pokemon[0].type);
  });
  test('pokemon component link test', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const link = getAllByRole('link')[3];
    expect(link.href).toBe(`http://localhost/pokemons/${pokemon[0].id}`);
  });
  test('pokemon component image test', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const images = getAllByRole('img');
    expect(images[0].alt).toBe(`${pokemon[0].name} sprite`);
    expect(images[0].src).toBe(pokemon[0].image);
  });
  test('pokemon component star image test', () => {
    const { getByLabelText, getAllByRole } = renderWithRouter(<App />, { route: `/pokemons/${pokemon[0].id}` });

    const addFavorite = getByLabelText(/Pokémon favoritado/i);
    fireEvent.click(addFavorite);
    const images = getAllByRole('img');
    console.log(images[1].src);
    expect(images[1].src).toBe('http://localhost/star-icon.svg');
    expect(images[1].alt).toBe(`${pokemon[0].name} is marked as favorite`);
  });
});
