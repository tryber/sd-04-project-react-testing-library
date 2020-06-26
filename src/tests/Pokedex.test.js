import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './utils';
import pokemons from '../data';

const types = pokemons
  .map((pokemon) => pokemon.type)
  .filter((type, index, arr) => arr.indexOf(type) === index);

afterEach(cleanup);

test('Should a h2', () => {
  const { getAllByRole } = renderWithRouter(<App />);
  const heading = getAllByRole('heading');
  const header2 = heading.find((h) => h.nodeName === 'H2');
  expect(header2.innerHTML).toMatch('Encountered pokémons');
});

test('Should heave a next button', () => {
  const { getByText } = renderWithRouter(<App />);
  const nextButton = getByText('Próximo pokémon');
  expect(nextButton).toBeInTheDocument();
});

test('Next button should change pokemon', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const allButton = getByText('All');
  const nextButton = getByText('Próximo pokémon');
  fireEvent.click(allButton);
  pokemons.forEach((pokemon, index) => {
    let name = getByTestId('pokemon-name');
    expect(name.innerHTML).toMatch(pokemon.name);
    fireEvent.click(nextButton);
    name = getByTestId('pokemon-name');
    expect(name.innerHTML).toMatch(
      pokemons[index === pokemons.length - 1 ? 0 : index + 1].name,
    );
  });
});

test('Should have filter buttons', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const nextButton = getByText('Próximo pokémon');
  const fireButton = getByText('Fire');
  const type = getByTestId('pokemonType');
  fireEvent.click(fireButton);
  expect(type.innerHTML).toMatch('Fire');
  fireEvent.click(nextButton);
  expect(type.innerHTML).toMatch('Fire');
});

test('Next Button Should be disabled case theres only one pokemon in that specific type', () => {
  const { getByText } = renderWithRouter(<App />);
  const nextButton = getByText('Próximo pokémon');
  const bugButton = getByText('Bug');
  fireEvent.click(bugButton);
  expect(nextButton).toBeDisabled();
});

test('Should have an unique filter button to each type', () => {
  const { getAllByTestId, getByText } = renderWithRouter(<App />);
  const filterButtons = getAllByTestId('pokemon-type-button');
  const allButton = getByText('All');
  expect(allButton).toBeInTheDocument();
  expect(filterButtons.length).toBe(types.length);
});
