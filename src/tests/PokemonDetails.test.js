import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import {fireEvent } from '@testing-library/react';
// import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// import { logDOM } from '@testing-library/react';
import pokemons from './mockPokemon';
// import pokemons from '../data';

test('renders a reading with the text `pikachu Details`', () => {
  const { getAllByRole, getByText } = renderWithRouter(<App />);
  const detailLink = getAllByRole('link');
  console.log(pokemons.name);
  fireEvent.click(detailLink[3]);
  // logDOM();
  expect(getByText(`${pokemons.name} Details`)).toBeInTheDocument();
});
