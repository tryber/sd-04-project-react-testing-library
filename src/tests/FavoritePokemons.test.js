import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('file "FavoritePokemons.js"', () => {
  test('Favorite Pokemon not Found', () => {
    const { getByText } = render(<FavoritePokemons pokemons={[]} />);
    const notFavorited = getByText('No favorite pokemon found');
    expect(notFavorited).toBeInTheDocument();
  });

  // test('', () => {});
});
