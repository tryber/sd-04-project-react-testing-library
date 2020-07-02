import React from 'react';
import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from '../services/renderWithRouter';
import Data from '../data';

describe('Teste da página de detalhes dos pokemons', () => {
  Data.forEach(({ id, name, foundAt, summary }) => {
    test('Testando a pagina', () => {
      const { getByText, getByAltText, getAllByRole } = renderWithRouter(<PokemonDetails />, { route: `/pokemon/${id}` });

      expect(getByText(`${name} Details`)).toBeInTheDocument();
      expect(getByText(summary)).toBeInTheDocument();
      expect(getByAltText(`${name} location`)).toBeInTheDocument();
      expect(getByText(`Game Locations of ${name}`)).toBeInTheDocument();
      foundAt.forEach(({ location, map }) => {
        expect(getByText(location)).toBeInTheDocument();
        expect((getAllByRole('img').src).find((maps) => maps === map)).toBeInTheDocument();
      });
    });
  });

  test('CheackBox text', () => {
    const { getByText, getByRole } = renderWithRouter(<PokemonDetails />);

    expect(getByRole('checkBox')).toBeInTheDocument();
    expect(getByText('Pokémon favoritado?')).toBeInTheDocument();
  });
});
