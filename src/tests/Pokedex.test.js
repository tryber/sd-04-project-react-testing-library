import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './helpFunction';
import pokemons from '../data';
import App from '../App';

describe('Tests Pokedex component', () => {
  test('test states and props', () => {
    const { getByText, getByTestId, getAllByTestId } = renderWithRouter(<App />);
    expect(getByText(/Próximo pokémon/i)).toBeInTheDocument();
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
    const allButton = getByText(/All/i);
    expect(allButton).toBeInTheDocument();
    fireEvent.click(allButton);
    expect(getByTestId('pokemonType').innerHTML).toBe(pokemons[0].type);
    expect(getByTestId('next-pokemon')).toBeInTheDocument();
    expect(getAllByTestId('pokemon-type-button')[1]).toBeInTheDocument();
  });
});
