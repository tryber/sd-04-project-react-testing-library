import React from 'react';
import { cleanup, screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

afterEach(cleanup);

describe('7. Tests of the PokemonDetails.js file', () => {
  test('It should contain more information about just the selected Pokémon, and not contain a navigation link to display details.', () => {
    data.forEach(({ name, id }) => {
      renderWithRouter(<App />, { route: `/pokemons/${id}` });
      expect(screen.getByText(`${name} Details`)).toBeInTheDocument();
      expect(screen.queryByText('More details')).not.toBeInTheDocument();
    });
  });

  test('The details section must contain an heading h2 with the text Summary.', () => {
    renderWithRouter(<App />);

    const buttonMoreDetails = screen.getByText('More details');
    fireEvent.click(buttonMoreDetails);

    const heading = screen.getByText('Summary');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  test('The details section should contain a paragraph with the summary of the specific Pokémon being viewed.', () => {
    data.forEach(({ summary, id }) => {
      renderWithRouter(<App />, { route: `/pokemons/${id}` });
      expect(screen.getByText(summary)).toBeInTheDocument();
      expect(screen.getByText(summary).tagName).toBe('P');
    });
  });

  test('The details page should display a section with the maps with the locations of the pokémon.', () => {
    data.forEach(({ name, id, foundAt }) => {
      renderWithRouter(<App />, { route: `/pokemons/${id}` });
      expect(screen.getByText(`Game Locations of ${name}`)).toBeInTheDocument();
      expect(screen.getByText(`Game Locations of ${name}`).tagName).toBe('H2');

      foundAt.forEach(({ location, map }) => {
        expect(screen.getByText(location)).toBeInTheDocument();
        expect(screen.getAllByAltText(`${name} location`).some(({ src }) => src === map)).toBeTruthy();
      });
    });
  });

  test('The details page should allow you to favor a Pokémon.', () => {
    renderWithRouter(<App />);
    const buttonMoreDetails = screen.getByText('More details');
    fireEvent.click(buttonMoreDetails);
    expect(screen.getByText('Pokémon favoritado?')).toBeInTheDocument();
    expect(screen.getByLabelText(/pokémon favoritado/i).type).toBe('checkbox');
  });
});
