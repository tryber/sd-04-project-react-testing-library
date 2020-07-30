import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

const mock = () => pokemons[2];

test('Caso a pessoa não tenha pokémons favoritos, a mensagem `No favorite pokemon found` deve aparecer na tela', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={[]} />, { route: '/favorites' });
  const text = getByText(/No favorite pokemon found/i);

  expect(text).toBeInTheDocument();
});

test('A página não deve exibir nenhum card de pokémon não favoritado', () => {
  const { queryByText } = renderWithRouter(
    <FavoritePokemons pokemons={pokemons.slice(3, 5)} />,
    { route: '/favorites' },
  );
  expect(queryByText).not.toEqual(mock());
});

test('A página deve exibir todos os cards de pokémons favoritados', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const favoritos = getByText(/Favorite/i);
  const detalhes = getByText(/More details/i);
  fireEvent.click(detalhes);
  const favoritados = getByText(/Pokémon favoritado?/i);
  fireEvent.click(favoritados);
  fireEvent.click(favoritos);
  const escolhido = getByText(/Pikachu/i);
  expect(escolhido).toBeInTheDocument();
});
