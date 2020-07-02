import React from 'react';
import { cleanup, screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('3. Testing the FavoritePokemons.js file', () => {
  test('If the person does not have favorite pokémons, the message No favorite pokemon found should appear on the screen.', () => {
    renderWithRouter(<App />);

    const pokemonFavorite = screen.getByText(/Favorite pokémons/i);
    fireEvent.click(pokemonFavorite);

    const favoritePokemonNoFoud = screen.getByText('No favorite pokemon found');
    expect(favoritePokemonNoFoud).toBeInTheDocument();
  });

  test('The page should display only the favorite Pokémon cards.', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByText(/More details/i);
    fireEvent.click(moreDetails);

    const checkboxFavorite = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(checkboxFavorite);

    const favoritePokemonsLink = screen.getByText('Favorite Pokémons');
    fireEvent.click(favoritePokemonsLink);

    const pokemon = screen.getAllByAltText(/is marked as favorite/i);
    expect(pokemon.length).toBe(1);
  });
});
