import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import pokemons from '../data';

test('It should contain information about the selected Pokémon', () => {
  const { getByText, queryByText, container } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More Details/i));

  expect(getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
  expect(queryByText(`${pokemons[1].name} Details`)).not.toBeInTheDocument();

  expect(queryByText(/More Details/i)).not.toBeInTheDocument();

  expect(getByText('Summary').tagName).toBe('H2');

  expect(container.querySelector('section > p').innerHTML).toMatch('Pokémon');
});
