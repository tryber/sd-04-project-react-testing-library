import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';

import App from '../App';

const pokemon = {
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
  summary:
    'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
};

afterEach(cleanup);

describe('Testes - Pokemon', () => {
  it('Name', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const name = getByTestId(/pokemon-name/i);

    expect(name).toBeInTheDocument();

    expect(name.textContent).toBe(pokemon.name);
  });

  it('Type', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const type = getByTestId(/pokemonType/i);

    expect(type).toBeInTheDocument();

    expect(type.textContent).toBe(pokemon.type);
  });

  it('Average weight', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const averageWeightElement = getByTestId(/pokemon-weight/i);

    expect(averageWeightElement).toBeInTheDocument();

    const averageWeightDescription =
      `Average weight:` +
      `${pokemon.averageWeight.value}` +
      `${pokemon.averageWeight.measurementUnit}`;

    expect(averageWeightElement.textContent).toBe(averageWeightDescription);
  });

  it('Image', () => {
    const { getByAltText } = renderWithRouter(<App />);

    const altText = `${pokemon.name} ` + `sprite`;

    expect(getByAltText(altText)).toBeInTheDocument();

    expect(getByAltText(altText).src).toBe(pokemon.image);
  });

  it('Image - Star', () => {
    const { getByText, getByLabelText, getByAltText } = renderWithRouter(
      <App />
    );

    const link = getByText(/More details/i);

    fireEvent.click(link);

    const checkbox = getByLabelText(/Pokémon favoritado?/i);

    fireEvent.click(checkbox);

    const altText = `${pokemon.name} ` + `is marked as favorite`;

    expect(getByAltText(altText)).toBeInTheDocument();

    // console.log(getByAltText(altText).src.slice(-14));

    expect(getByAltText(altText).src.slice(-14)).toBe(`/star-icon.svg`);
  });
});
