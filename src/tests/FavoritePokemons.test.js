import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

test('Pokemons Favoritos', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const favoritos = getByText(/Favorite/i);
  fireEvent.click(favoritos);
  const vazio = getByText('No favorite pokemon found');
  expect(vazio).toBeInTheDocument();
  const inciial = getByText(/Home/i);
  fireEvent.click(inciial);
  const detalhes = getByText(/More details/i);
  fireEvent.click(detalhes);
  const favoritados = getByText(/Pokémon favoritado?/i);
  fireEvent.click(favoritados);
  fireEvent.click(favoritos);
  const escolhido = getByText(/Pikachu/i);
  expect(escolhido).toBeInTheDocument();
});
