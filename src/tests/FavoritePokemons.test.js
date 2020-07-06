import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('requirement 3', () => {
  test('no favorite pokemons found', () => {
    const { getByText } = render(<FavoritePokemons pokemons={[]} />);
    const sentence = getByText(/no favorite pokemon found/i);
    expect(sentence).toBeInTheDocument();
  });
  test('favorite pokemon', () => {
    const { getByText, getAllByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const details = getByText(/more details/i);
    fireEvent.click(details);
    const favoriteCheckbox = getByText(/pokémon favoritado?/i);
    fireEvent.click(favoriteCheckbox);
    const favoritePokemons = getByText(/favorite pokémons/i);
    fireEvent.click(favoritePokemons);
    const favoriteQuantity = getAllByAltText(/is marked as favorite/i);
    expect(favoriteQuantity.length).toBe(1);
  });
});
