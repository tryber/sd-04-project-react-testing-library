import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import data from '../data';

describe('sétimo requisito', () => {
  it('deve conter mais informações sobre apenas o pokémon selecionado', () => {
    data.forEach(({ id, name, summary }, index) => {
      const {
        getByText,
        queryByText,
        queryAllByText,
      } = renderWithRouter(<App />, {
        route: `/pokemons/${id}`,
      });
      expect(getByText(`${name} Details`)).toBeInTheDocument();
      expect(getByText(`Game Locations of ${name}`)).toBeInTheDocument();
      expect(queryByText(/More Details/i)).toBeNull();
      expect(queryAllByText('Summary')[0].tagName).toBe('H2');
      expect(queryByText(summary)).toBeInTheDocument();
      expect(queryByText(summary).tagName).toBe('P');
      const checkbox = queryAllByText(/Pokémon favoritado?/i)[index];
      expect(checkbox).toBeInTheDocument();
    });
  });
  it('checando imagens do primeiro pokemon', () => {
    const { getAllByAltText } = renderWithRouter(<App />, {
      route: '/pokemons/25',
    });
    const { name, foundAt } = data[0];
    const images = getAllByAltText(`${name} location`);
    expect(images).toHaveLength(foundAt.length);
    foundAt.forEach(({ map }) => {
      expect(images.some(({ src }) => src === map)).toBe(true);
    });
  });
});
