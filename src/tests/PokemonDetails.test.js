import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import data from '../data';

describe('sétimo requisito', () => {
  it('deve conter mais informações sobre apenas o pokémon selecionado', () => {
    data.forEach(({ id, name, summary, foundAt }, index) => {
      const {
        getByText,
        queryByText,
        queryAllByText,
        getAllByAltText,
      } = renderWithRouter(<App />, {
        route: `/pokemons/${id}`,
      });
      expect(getByText(`${name} Details`)).toBeInTheDocument();
      expect(queryByText(/More Details/i)).toBeNull();
      expect(queryAllByText('Summary')[0].tagName).toBe('H2');
      expect(queryByText(summary)).toBeInTheDocument();
      expect(queryByText(summary).tagName).toBe('P');
      expect(getAllByAltText(`${name} location`)).toHaveLength(foundAt.length);
      const checkbox = queryAllByText(/Pokémon favoritado?/i)[index];
      expect(checkbox).toBeInTheDocument();
    });
  });
});
