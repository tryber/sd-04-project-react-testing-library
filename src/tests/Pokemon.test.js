import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';
import App from '../App';
import Pokemon from '../components/Pokemon';

describe('it tests Pokemon file', () => {
  test('pokemon info card', () => {
    const { getByText, getByAltText, getAllByTestId, getByTestId } = renderWithRouter(<App />);

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

  test('it test if a favorite pokemon has a star', () => {
    pokemons.forEach((pokemon) => {
      const { getByAltText } = renderWithRouter(<Pokemon pokemon={pokemon} isFavorite />);
      const img = getByAltText(`${pokemon.name} is marked as favorite`);
      expect(img).toBeInTheDocument();
      expect(img.src).toMatch('/star-icon.svg');
    });
  });
});
