import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
// import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// import { logDOM } from '@testing-library/react';
import pokemons from './mockPokemonDetail';
import pokemon from './mockPokemon';
// import { Link } from 'react-router-dom';
// import pokemons from '../data';

test('renders a reading with the text `pikachu Details`', () => {
  const { getAllByRole, getByText } = renderWithRouter(
    <App pokemons={pokemons} />,
  );
  const detailLink = getAllByRole('link');
  fireEvent.click(detailLink[3]);
  // logDOM();
  expect(getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
});

test('There must be no link to this pokemon detail page', () => {
  const { getAllByRole } = renderWithRouter(<App pokemons={pokemons} />);
  const linkHomePage = getAllByRole('link');
  fireEvent.click(linkHomePage[3]);
  const linksdetailpage = getAllByRole('link');
  linksdetailpage.map((link) => expect(link.href).not.toBe('http://localhost/pokemons/25'));
});

test('renders a h2 with the text `pikachu Details`', () => {
  const { getAllByRole, getByText } = renderWithRouter(
    <App pokemons={pokemons} />,
  );
  const detailLink = getAllByRole('link');
  fireEvent.click(detailLink[3]);
  const element = getByText(/Summary/);
  expect(element).toBeInTheDocument();
  expect(element.tagName).toEqual('H2');
});

test('renders a h2 with the text Game Locations of <name>', () => {
  const { getAllByRole, getByText } = renderWithRouter(
    <App pokemons={pokemons} />,
  );
  const detailLink = getAllByRole('link');
  fireEvent.click(detailLink[3]);
  const element = getByText(`Game Locations of ${pokemons[0].name}`);
  expect(element).toBeInTheDocument();
  expect(element.tagName).toEqual('H2');
});
