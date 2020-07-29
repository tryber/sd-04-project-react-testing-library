import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import pokemons from '../data';
import App from '../App';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

describe('Pokemon component tests', () => {

  test('???', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemonTypes = getAllByTestId('pokemonType');
    pokemonTypes.forEach((but) => {
      expect(but).toBeInTheDocument();
      expect(but.textContent).not.toBe('');
    });
  });

  describe('Pokemon card info tests', () => {
    it('should render pokemon name', () => {
      const { getByTestId } = renderWithRouter(<App />);
      const pokemonName = getByTestId('pokemon-name');
      expect(pokemonName.textContent).toBe(pokemons[0].name);
    });

    it('should render average weight', () => {
      const { getByTestId } = renderWithRouter(<App />);
      const { averageWeight: { value, measurementUnit } } = pokemons[0];
      const pokemonWeight = getByTestId('pokemon-weight').textContent;
      expect(pokemonWeight).toBe(`Average weight:${value}${measurementUnit}`);
    });

    it('should render image with correct URL source', () => {
      const { getByAltText, getByTestId } = renderWithRouter(<App />);
      const pokemonName = getByTestId('pokemon-name').textContent;
      const pokemonImage = getByAltText(`${pokemonName} sprite`);
      expect(pokemonImage.src).toBe(pokemons[0].image);
    });

    it('should render a link for details about pokemon', () => {
      const { getByText } = renderWithRouter(<App />);
      const detailsBtn = getByText('More details');
      const pokemonId = pokemons[0].id;
      expect(detailsBtn).toBeInTheDocument();
      expect(detailsBtn.href.endsWith(`/pokemons/${pokemonId}`)).toBeTruthy();
    });

    it('details link should redirect to correct pokemon details page', () => {
      const { getByText } = renderWithRouter(<App />);
      const detailsBtn = getByText('More details');
      expect(getByText('Encountered pokémons')).toBeInTheDocument();
      fireEvent.click(detailsBtn);
      expect(getByText('Pikachu Details')).toBeInTheDocument();
    });

    describe('Favorite pokemons should have a star icon', () => {
      it('icon should have `/star-icon.svg` source', () => {
        const route = '/pokemons/25';
        const { getByText, getByAltText } = renderWithRouter(<App />, { route });
        const favCheckbox = getByText('Pokémon favoritado?');
        fireEvent.click(favCheckbox);
        const icon = getByAltText('Pikachu is marked as favorite');
        expect(icon).toBeInTheDocument();
        expect(icon.src.endsWith('/star-icon.svg')).toBe(true);
      });
    });

    it('icon image should have `<pokemon> is marked as favorite` alt text', () => {
      const route = '/pokemons/25';
      const { getByAltText, getByTestId } = renderWithRouter(<App />, { route });
      const pokemonName = getByTestId('pokemon-name').textContent;
      const icon = getByAltText(`${pokemonName} is marked as favorite`);
      expect(icon).toBeInTheDocument();
    });
  });
});
