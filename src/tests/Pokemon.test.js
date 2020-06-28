import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import data from '../data';
import Pokemon from '../components/Pokemon';
import App from '../App';

const pikachu = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
};

afterEach(cleanup);

describe('Test Pokemon.js', () => {
  test('Return information about a pokemon', () => {
    const { getByTestId } = renderWithRouter(<App />, { route: '/' });
    const name = getByTestId('pokemon-name');
    const type = getByTestId('pokemonType');
    const weight = getByTestId('pokemon-weight');

    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(weight).toBeInTheDocument();
  });

  test('Text format - Average weight', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/' });

    const button = getByText('Próximo pokémon');

    data.forEach(({ averageWeight: { value, measurementUnit } }) => {
      const averageWeight = getByText(
        `Average weight:${value}${measurementUnit}`,
      );
      expect(averageWeight).toBeInTheDocument();
      fireEvent.click(button);
    });
  });

  test('Must have an image', () => {
    const { container, getByAltText, getByText } = renderWithRouter(<App />, { route: '/' });
    const img = container.querySelector('img');
    const button = getByText('Próximo pokémon');

    data.forEach(({ name, image }) => {
      const alt = getByAltText(`${name} sprite`);
      expect(alt).toBeInTheDocument();
      expect(img).toHaveAttribute('src', `${image}`);
      fireEvent.click(button);
    });
  });

  test('Pokédex must contain a navigation link to view details of this pokémon', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/' });
    const button = getByText(/Próximo pokémon/i);
    const moreInfo = getByText(/More details/i);

    data.forEach(({ id }) => {
      expect(moreInfo.href).toMatch(`pokemons/${id}`);
      fireEvent.click(button);
    });
  });

  test('Click in more details should redirect for `/pokemons/id`', () => {
    const { getByText, history } = renderWithRouter(<App />, { route: '/' });

    const moreInfo = getByText('More details');
    const { id } = data[0];

    fireEvent.click(moreInfo);
    expect(history.location.pathname).toMatch(`pokemons/${id}`);
  });

  test('Favorite Pokémon should display a star icon', () => {
    const { getByAltText } = renderWithRouter(<Pokemon pokemon={pikachu} isFavorite />);
    const img = getByAltText(`${pikachu.name} is marked as favorite`);

    expect(img).toBeInTheDocument();
    expect(img.src).toMatch(/\/star-icon.svg/);
  });
});
