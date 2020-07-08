import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

afterEach(cleanup);

describe('Test PokemonDetails.js', () => {
  data.forEach(({
    name, id, summary, foundAt;
  }) => {
    test(`Show ${name} details`, () => {
      const {
        getByText, queryByText, getByLabelText, getAllByAltText,
      } = renderWithRouter(
        <App />,
        { route: `/pokemons/${id}` },
      );

      expect(getByText(`${name} Details`)).toBeInTheDocument();
      expect(queryByText('More details')).not.toBeInTheDocument();

      expect(queryByText('Summary')).toBeInTheDocument();
      expect(queryByText('Summary').tagName).toBe('H2');

      expect(getByText(summary)).toBeInTheDocument();
      expect(getByText(summary).tagName).toBe('P');

      expect(getByText(`Game Locations of ${name}`)).toBeInTheDocument();
      expect(getByText(`Game Locations of ${name}`).tagName).toBe('H2');

      foundAt.forEach(({ location, map }) => {
        expect(getByText(location)).toBeInTheDocument();
        expect(getAllByAltText(`${name} location`).some(({ src }) => src === map)).toBeTruthy();
      });

      expect(getByLabelText(/pokémon favoritado/i)).toBeInTheDocument();
      expect(getByLabelText(/pokémon favoritado/i).type).toBe('checkbox');
    });
  });
});
