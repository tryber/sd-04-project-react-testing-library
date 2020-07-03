import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import pokemons from '../data';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';

afterEach(cleanup);

describe('Rest Pokemon.js', () => {
  test('Pokemon name should be correct', () => {
    const {
      getByText, getByAltText, getAllByTestId, getByTestId,
    } = renderWithRouter(<App />);

    expect(getAllByTestId('pokemon-name').length).toBe(1);
    pokemons.forEach(({ id, name, type, image, averageWeight: { value, measurementUnit } }) => {
      expect(getByText(name)).toBeInTheDocument();
      expect(getByAltText(`${name} sprite`)).toBeInTheDocument();
      expect(getByAltText(`${name} sprite`).src).toBe(image);
      expect(getByTestId('pokemonType').textContent).toBe(type);
      expect(getByText(`Average weight:${value}${measurementUnit}`)).toBeInTheDocument();
      expect(getByText('More details').href).toMatch(`/pokemons/${id}`);
      fireEvent.click(getByText('Próximo pokémon'));
    });
  });

  test('favorite pokemon should have a star',() => {
    pokemons.forEach((pokemon) => {
      const { getByAltText } = renderWithRouter(<Pokemon pokemon={pokemon} isFavorite />);
      const img = getByAltText(`${pokemon.name} is marked as favorite`);
      expect(img).toBeInTheDocument();
      expect(img.src).toMatch('/star-icon.svg');
    });
  });
});
