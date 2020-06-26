import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Pokemon', () => {
  test('Card with the pokemon details', () => {
    const { getByText, getByTestId, container } = renderWithRouter(<App />);
    pokemons.forEach(({ id, name, type, averageWeight: { value, measurementUnit } }) => {
      expect(getByText(name)).toBeInTheDocument();
      expect(getByTestId('pokemonType').innerHTML).toBe(type);
      expect(getByText(`Average weight:${value}${measurementUnit}`)).toBeInTheDocument();
      expect(container.querySelector('img').src).toMatch(String(id));
      expect(container.querySelector('img').alt).toMatch(name);
      expect(container.querySelector('div.pokemon-overview > a').href).toMatch(`pokemons/${id}`);
      fireEvent.click(getByText('Próximo pokémon'));
    });
  });

  test('When click for details goes to pokemons route', () => {
    pokemons.forEach(({ id }, index) => {
      const { getByText, history } = renderWithRouter(<App />);
      for (let j = 0; j < index; j += 1) {
        fireEvent.click(getByText('Próximo pokémon'));
      }
      expect(history.location.pathname).toBe('/');
      fireEvent.click(getByText('More details'));
      expect(history.location.pathname).toMatch(`pokemons/${id}`);
    });
  });

  test('Favorite pokemons have a star icon', () => {
    pokemons.forEach((pokemon) => {
      const { container } = renderWithRouter(<Pokemon pokemon={pokemon} isFavorite />);
      expect(container.querySelector('img + img').src).toMatch('/star-icon.svg');
      expect(container.querySelector('img + img').alt).toMatch(
        `${pokemon.name} is marked as favorite`,
      );
    });
  });
});
