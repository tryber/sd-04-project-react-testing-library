import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

describe('PokemonDetails component tests', () => {

  test('???', () => {
    const { getAllByAltText } = render(
      <MemoryRouter initialEntries={['/pokemons/25']}><App /></MemoryRouter>,
    );
    const mapImgs = getAllByAltText('Pikachu location');
    mapImgs.forEach((img) => expect(img.src).not.toBe(''));
  });

  describe('should contain more info about pokemon', () => {
    it('page should contain `<pokemon> Details` text', () => {
      const route = '/pokemons/25';
      const { getByText } = renderWithRouter(<App />, { route });
      expect(getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
    });

    it('should not render link for more details about pokemon', () => {
      const route = '/pokemons/25';
      const { queryByText } = renderWithRouter(<App />, { route });
      expect(queryByText('More details')).not.toBeInTheDocument();
    });

    it('page should render `Summary` h2 heading', () => {
      const route = '/pokemons/25';
      const { getByText } = renderWithRouter(<App />, { route });
      expect(getByText('Summary')).toBeInTheDocument();
    });

    it('page should render paragraph summarizing pokemon', () => {
      const route = '/pokemons/25';
      const { getByText } = renderWithRouter(<App />, { route });
      expect(getByText(pokemons[0].summary)).toBeInTheDocument();
    });
  });

  describe('should render maps with pokemon locations', () => {
    it('should render `Game Locations of <name>` h2 heading', () => {
      const route = '/pokemons/25';
      const { getByText, getByTestId } = renderWithRouter(<App />, { route });
      const pokemonName = getByTestId('pokemon-name').textContent;
      const heading = getByText(`Game Locations of ${pokemonName}`);
      expect(heading).toBeInTheDocument();
    });

    it('details section should have all pokemon locations', () => {
      const route = '/pokemons/25';
      const { getByText, getByTestId } = renderWithRouter(<App />, { route });
      const pokemonName = getByTestId('pokemon-name').textContent;
      const locations = pokemons.filter(({ name }) => name === pokemonName)[0].foundAt
        .map(({ location }) => location);
      locations.forEach((location) => expect(getByText(location)).toBeInTheDocument());
    });

    it('should display name and map of pokemon location', () => {
      const route = '/pokemons/25';
      const { getByTestId, getAllByAltText } = renderWithRouter(<App />, { route });
      const pokemonName = getByTestId('pokemon-name').textContent;
      const maps = pokemons.filter(({ name }) => name === pokemonName)[0].foundAt
        .map(({ map }) => map);
      const mapImages = getAllByAltText('Pikachu location');
      mapImages.forEach((img) => {
        maps.forEach((map) => {
          if (img.src === map) {
            expect(img.src).toBe(map);
            expect(img).toBeInTheDocument();
          }
        });
      });
    });
  });

  describe('page should allow to add a pokemon to favorite', () => {
    it('should render a favorite checkbox', () => {
      const route = '/pokemons/25';
      const { getByText, getByTestId, getByLabelText } = renderWithRouter(<App />, { route });
      const favCheckbox = getByLabelText('Pokémon favoritado?');
      expect(favCheckbox).toBeInTheDocument();
      fireEvent.click(favCheckbox);
      const favLink = getByText('Favorite Pokémons');
      fireEvent.click(favLink);
      const pokemonName = getByTestId('pokemon-name').textContent;
      expect(pokemonName).toBe('Pikachu');
    });
  });
});
