import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FavoritePokemons } from '../components';
import App from '../App';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

describe('Favorite page tests', () => {
  it('should render message if no favorite pokemon is found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={[]} />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('should not render unfavored pokemons', () => {
    const route = '/pokemons/4';
    const { getByLabelText, getByText } = renderWithRouter(<App />, { route });
    const favoriteCheckbox = getByLabelText(/Pokémon favoritado?/i);
    const favoriteLink = getByText(/Favorite Pokémons/i);
    expect(favoriteCheckbox.checked).toBeFalsy();
    fireEvent.click(favoriteLink);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('should only render favorite pokemons', () => {
    const route = '/pokemons/4';
    const { getByLabelText, getByText } = renderWithRouter(<App />, { route });
    const favoriteCheckbox = getByLabelText(/Pokémon favoritado?/i);
    const favoriteLink = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox.checked).toBeTruthy();
    fireEvent.click(favoriteLink);
    expect(getByText(/More details/i)).toBeInTheDocument();
  });
});
