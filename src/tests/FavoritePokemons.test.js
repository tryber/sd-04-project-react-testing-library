import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';
import App from '../App';

afterEach(cleanup);

describe('file "FavoritePokemons.js"', () => {
  test('Favorite Pokemon not Found', () => {
    const { getByText } = render(<FavoritePokemons pokemons={[]} />);
    const notFavorited = getByText(/No favorite pokemon found/i);
    expect(notFavorited).toBeInTheDocument();
  });

  test('Favorite Pokémon', () => {
    const { getAllByAltText, getByText, getByLabelText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pkmDetail = getByText(/More details/i);
    fireEvent.click(pkmDetail);
    const favoriteButton = getByLabelText(/Pokémon favoritado?/i);
    fireEvent.click(favoriteButton);
    const pkm = getAllByAltText(/is marked as favorite/i);
    expect(pkm.length).toBe(1);
  });
});
