import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

test('If the person does not have favorite pokémons, the message `No favorite pokemon found` should appear on the screen.', () => {
  const { getByText } = renderWithRouter(<App />, { route: '/favorites' });
  const favoritePokemons = document.querySelectorAll('.favorite-pokemon');
  if (favoritePokemons.length === 0) {
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  }
});

// test('The page should not display any non-favored Pokémon cards.', () => {
//   const { getByText } = renderWithRouter(<App />, { route: '/favorites' });
//   const notfavoritePokemons = document.querySelectorAll('.pokemon');
//   expect(notfavoritePokemons).not.toBeInTheDocument();
// });

// test('The page should display all favorite Pokémon cards;', () => {
//   const { getByText } = renderWithRouter(<App />, { route: '/about' });
//   expect(getByText(/About Pokédex/i)).toBeInTheDocument();
// });
