import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FavoritePokemons from '../components/FavoritePokemons';

function renderWithRouter(ui, routeConfigs = {}) {
  const route = routeConfigs.route || '/';
  const history = routeConfigs.history || createMemoryHistory({ initialEntries: [route] });
  return {
    ...render(<Router history={history}>{ui}</Router>, history,),
  };
}

describe('it tests FavoritePokemon file', () => {
  test('it tests if theres no favorite pokemon', () => {
    const favoritePokemons = [];
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={favoritePokemons} />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  test('shows every favorite pokemon card', () => {
    const favoritePokemons = [
      { id: 1, name: 'Picachu', averageWeight: { value: '6.0', measurementUnit: 'kg' } },
      { id: 2, name: 'Charmander', averageWeight: { value: '8.5', measurementUnit: 'kg' } },
    ];
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={favoritePokemons} />);
    favoritePokemons.forEach((pokemon) => {
      const namePokemon = getByText(pokemon.name);
      expect(namePokemon).toBeInTheDocument();
    });
  });
});
