import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

afterEach(cleanup);

describe('Teste PokemonDetails', () => {
  test('Clicar e testar', () => {
    const {
      getByText,
      getByLabelText,
      queryAllByText,
      getAllByAltText,
      getAllByRole,
    } = renderWithRouter(<App />);
    const link = getByText(/More Details/i);
    fireEvent.click(link);
    const h2 = Array.from(document.getElementsByTagName('h2'));
    const summaryExist = h2.some((item) => item.innerHTML === ' Summary ');
    expect(summaryExist).toBe(true);
    expect(getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
    const moreDetails = queryAllByText(/More Details/i);
    expect(moreDetails.length).toBe(0);
    expect(getByText(pokemons[0].summary)).toBeInTheDocument();
    expect(getByText(`Game Locations of ${pokemons[0].name}`));
    const habitats = document.querySelector('.pokemon-habitat');
    expect(habitats.childElementCount).toBe(pokemons[0].foundAt.length);
    pokemons[0].foundAt.map(({ location, map }) => {
      expect(getByText(location)).toBeInTheDocument();
      expect(getAllByAltText(`${pokemons[0].name} location`).length).toBeGreaterThan(0);
      const image = getAllByRole('img');
      const imageURLisOk = image.some((item) => item.src === map);
      expect(imageURLisOk).toBe(true);
      return null;
    });
    const favorite = getByLabelText('Pokémon favoritado?');
    fireEvent.click(favorite);
    const images = getAllByRole('img');
    const imagesTam = images.length;
    expect(images.some((img) => img.src.includes('/star-icon.svg'))).toBe(true);
    fireEvent.click(favorite);
    expect(getAllByRole('img').length).toBe(imagesTam - 1);
  });
});
