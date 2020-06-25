import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import { MemoryRouter } from 'react-router-dom';

test('Mensagem na tela caso nao exista pokemons favoritos ', () => {
  const { getByText } = render(
    <MemoryRouter>
      <FavoritePokemons />
    </MemoryRouter>,
  );
  expect(getByText('No favorite pokemon found')).toBeDefined();
});
