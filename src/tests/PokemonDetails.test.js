import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

describe('Veirificando', () => {
  pokemons.forEach(({ name, id, summary, foundAt }) => {
    test(`pokemon ${name} name, Summary`, () => {
      const { getByText, getAllByAltText } = render(
        <MemoryRouter initialEntries={[{ pathname: `/pokemons/${id}` }]}>
          <App />
        </MemoryRouter>,
      );
      expect(getByText(`${name} Details`)).toBeInTheDocument();
      expect(getByText('Summary')).toBeInTheDocument();
      expect(getByText(summary)).toBeInTheDocument();
      expect(getByText(`Game Locations of ${name}`)).toBeInTheDocument();
      const image = getAllByAltText(`${name} location`);
      const favorito = getByText('Pokémon favoritado?');
      fireEvent.click(favorito);
      fireEvent.click(favorito);
      console.log(favorito.innerHTML);
      foundAt.forEach(({ location, map }) => {
        expect(getByText(location)).toBeInTheDocument();
        expect(image.some(({ src }) => src === map)).toBeTruthy();
      });
    });
  });
});
