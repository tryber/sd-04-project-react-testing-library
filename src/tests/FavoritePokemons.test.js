import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import FavoritePokemons from '../components/FavoritePokemons';

function renderWithRouter(ui, routeConfigs = {}) {
  const route = routeConfigs.route || '/';
  const history = routeConfigs.history || createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

test('Testing page of `Favorite Pokemons`, no Favorite pokemon found ', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={[]} />);
  const pokemon = getByText(/No favorite pokemon found/i);
  expect(pokemon).toBeInTheDocument();
});
