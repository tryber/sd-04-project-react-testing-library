import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import App from '../App';

const mock = () => [10];

test('Caso a pessoa não tenha pokémons favoritos, a mensagem `No favorite pokemon found` deve aparecer na tela', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={[]} />, { route: '/favorites' });
  const text = getByText(/No favorite pokemon found/i);

  expect(text).toBeInTheDocument();
});
