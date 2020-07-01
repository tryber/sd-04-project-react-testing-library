import React from 'react';
import { fireEvent, getByAltText } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

it('should render a card with information about a pokemon', () => {
  const { getByTestId } = renderWithRouter(<App />);
  expect(getByTestId('pokemon-name')).toBeInTheDocument();
  expect(getByTestId('pokemonType')).toBeInTheDocument();
  expect(getByTestId('pokemon-weight')).toBeInTheDocument();
});

it('should show the correct pokemon name', () => {
  const { getByTestId } = renderWithRouter(<App />);
  expect(getByTestId('pokemon-name').innerHTML).toBe(pokemons[0].name);
  expect(getByTestId('pokemonType').innerHTML).toBe(pokemons[0].type);
});

it('should render the pokemon average weight in the correct format', () => {
  const { getByTestId } = renderWithRouter(<App />);
  expect(getByTestId('pokemon-weight').innerHTML).toBe(`Average weight:${pokemons[0].averageWeight.value}${pokemons[0].averageWeight.measurementUnit}`);
});

it('should render an image with the correct attributes', () => {
  const { getByAltText } = renderWithRouter(<App />);
  expect(getByAltText(`${pokemons[0].name} sprite`)).toHaveAttribute('src', pokemons[0].image);
  expect(getByAltText(`${pokemons[0].name} sprite`)).toHaveAttribute('alt', `${pokemons[0].name} sprite`);
});

it('should have a link for mor info about the pokemon', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText('More details').href).toMatch(`/pokemons/${pokemons[0].id}`);
});

it('should redirect to the details page when `More details` link is clicked', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('More details'));
  expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
});

it('should show a star icon on favorited pokemons', () => {
  const { getByText, getByAltText } = renderWithRouter(<App />);
  fireEvent.click(getByText('More details'));
  fireEvent.click(getByText('Pokémon favoritado?'));
  expect(getByAltText(`${pokemons[0].name} is marked as favorite`)).toHaveAttribute('src', '/star-icon.svg');
  expect(getByAltText(`${pokemons[0].name} is marked as favorite`)).toHaveAttribute('alt', `${pokemons[0].name} is marked as favorite`);
});