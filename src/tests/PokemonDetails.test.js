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

describe('Testes da página Pokemon Details', () => {
  it('Summary Section', () => {
    const { getByText } = renderWithRouter(<App />);

    const linkToDetails = getByText(/More details/i);

    expect(linkToDetails).toBeInTheDocument();

    fireEvent.click(linkToDetails);

    expect(getByText(/Summary/i)).toBeInTheDocument();

    const pokemonSummary = pokemon.summary;

    expect(getByText(/Summary/i).nextSibling.textContent).toBe(pokemonSummary);
  });

  it('Pokémon Favoritado', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);

    const linkToDetails = getByText(/More details/i);

    expect(linkToDetails).toBeInTheDocument();

    fireEvent.click(linkToDetails);

    expect(getByLabelText(/Pokémon favoritado?/i)).toBeInTheDocument();
  });

  it('Game Locations', () => {
    const { getByText } = renderWithRouter(<App />);

    const linkToDetails = getByText(/More details/i);

    expect(linkToDetails).toBeInTheDocument();

    fireEvent.click(linkToDetails);

    const gameLocationsTitle = `Game Locations of ${pokemon.name}`;

    expect(getByText(gameLocationsTitle)).toBeInTheDocument();
  });

  it('Maps', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);

    const linkToDetails = getByText(/More details/i);

    expect(linkToDetails).toBeInTheDocument();

    fireEvent.click(linkToDetails);

    const altText = `${pokemon.name} location`;

    // console.log(getAllByAltText(altText));

    getAllByAltText(altText).forEach((img) => {
      expect(img).toBeInTheDocument();
    });

    expect(getAllByAltText(altText)[0].src).toBe(pokemon.foundAt[0].map);
    expect(getAllByAltText(altText)[1].src).toBe(pokemon.foundAt[1].map);
  });

  it('Pokémon Details Title', () => {
    const { getByText } = renderWithRouter(<App />);

    const linkToDetails = getByText(/More details/i);

    expect(linkToDetails).toBeInTheDocument();

    fireEvent.click(linkToDetails);

    const title = `${pokemon.name} Details`;

    expect(getByText(title)).toBeInTheDocument();
  });
});
