import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
// import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// import { logDOM } from '@testing-library/react';
import pokemons from './mockPokemonDetail';
// import pokemons from '../data';

test('renders a reading with the text `pikachu Details`', () => {
  const { getAllByRole, getByText } = renderWithRouter(<App pokemons={pokemons} />);
  const detailLink = getAllByRole('link');
  console.log(pokemons);
  fireEvent.click(detailLink[3]);
  // logDOM();
  expect(getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
});
