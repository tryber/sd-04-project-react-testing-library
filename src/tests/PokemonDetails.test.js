import React from 'react';
import { cleanup, fireEvent, getByRole } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './utils';
import pokemons from '../data';

afterEach(cleanup);

test('Should have a header for the specific pokemon', () => {
  const { getByText } = renderWithRouter(<App />, {
    route: `/pokemons/${pokemons[0].id}`,
  });
  const header = getByText(`${pokemons[0].name} Details`);
  expect(header).toBeInTheDocument();
});

test('Should have only one pokemon', () => {
  const { getByTestId } = renderWithRouter(<App />, {
    route: `/pokemons/${pokemons[0].id}`,
  });
  const name = getByTestId('pokemon-name');
  expect(name).toBeInTheDocument();
});

test('Should not have a detail link', () => {
  const { queryByText } = renderWithRouter(<App />, {
    route: `/pokemons/${pokemons[0].id}`,
  });
  expect(queryByText(/More Details/i)).toBeNull();
});

test('Should have a Summary header inside detail section', () => {
  const { getAllByRole } = renderWithRouter(<App />, {
    route: `/pokemons/${pokemons[0].id}`,
  });
  const sections = getAllByRole('region');
  expect(sections[1].getElementsByTagName('H2')[0].innerHTML).toMatch(
    'Summary',
  );
});

test('Should have a Summary paragraph inside detail section', () => {
  const { getAllByRole } = renderWithRouter(<App />, {
    route: `/pokemons/${pokemons[0].id}`,
  });
  const sections = getAllByRole('region');
  expect(sections[1].getElementsByTagName('p')[0].innerHTML).toMatch(
    pokemons[0].summary,
  );
});

test('Should have a Summary header inside map section', () => {
  const { getAllByRole } = renderWithRouter(<App />, {
    route: `/pokemons/${pokemons[0].id}`,
  });
  const sections = getAllByRole('region');
  expect(sections[2].getElementsByTagName('H2')[0].innerHTML).toMatch(
    `Game Locations of ${pokemons[0].name}`,
  );
});

test('Should have all locations inside map section', () => {
  const { getAllByRole } = renderWithRouter(<App />, {
    route: `/pokemons/${pokemons[0].id}`,
  });
  const sections = getAllByRole('region');
  expect(sections[2].getElementsByTagName('img').length).toBe(
    pokemons[0].foundAt.length,
  );
  expect(sections[2].getElementsByTagName('em').length).toBe(
    pokemons[0].foundAt.length,
  );
});

test('Locations image should have correct src and alt atribute', () => {
  const { getAllByRole } = renderWithRouter(<App />, {
    route: `/pokemons/${pokemons[0].id}`,
  });
  const sections = getAllByRole('region');
  const imgs = sections[2].getElementsByTagName('img');
  pokemons[0].foundAt.forEach((imgInfo, index) => {
    expect(imgs[index].src).toMatch(imgInfo.map);
    expect(imgs[index].alt).toMatch(`${pokemons[0].name} location`);
  });
});

test('Locations image should have correct src and alt atribute', () => {
  window.localStorage.clear();
  const { getByLabelText } = renderWithRouter(<App />, {
    route: `/pokemons/${pokemons[0].id}`,
  });
  const checkbox = getByLabelText('Pokémon favoritado?');
  fireEvent.click(checkbox);
  expect(checkbox.checked).toEqual(true);
  let favoritePokemons = JSON.parse(
    window.localStorage.getItem('favoritePokemonIds'),
  );
  expect(favoritePokemons.length).toBe(1);
  fireEvent.click(checkbox);
  favoritePokemons = JSON.parse(
    window.localStorage.getItem('favoritePokemonIds'),
  );
  expect(favoritePokemons.length).toBe(0);
});
