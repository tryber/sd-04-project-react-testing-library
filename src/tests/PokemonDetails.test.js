import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';

import App from '../App';

const pokemon = {
  id: 23,
  name: 'Ekans',
  type: 'Poison',
  averageWeight: {
    value: '6.9',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/1/18/Spr_5b_023.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Goldenrod Game Corner',
      map:
        'https://cdn.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png',
    },
  ],
  summary:
    'It can freely detach its jaw to swallow large prey whole. It can become too heavy to move, however.',
};

afterEach(cleanup);

describe('Testes da página Pokemon Details', () => {
  it('Summary Section', () => {
    const { getByText } = renderWithRouter(<App />);

    const nextPokemon = getByText(/Próximo pokémon/i);

    expect(nextPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemon);
    fireEvent.click(nextPokemon);
    fireEvent.click(nextPokemon);

    const linkToDetails = getByText(/More details/i);

    expect(linkToDetails).toBeInTheDocument();

    fireEvent.click(linkToDetails);

    expect(getByText(/Summary/i)).toBeInTheDocument();

    const pokemonSummary = pokemon.summary;

    expect(getByText(/Summary/i).nextSibling.textContent).toBe(pokemonSummary);
  });

  it('Pokémon Favoritado', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);

    const nextPokemon = getByText(/Próximo pokémon/i);

    expect(nextPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemon);
    fireEvent.click(nextPokemon);
    fireEvent.click(nextPokemon);

    const linkToDetails = getByText(/More details/i);

    expect(linkToDetails).toBeInTheDocument();

    fireEvent.click(linkToDetails);

    expect(getByLabelText(/Pokémon favoritado?/i)).toBeInTheDocument();
  });

  it('Game Locations', () => {
    const { getByText } = renderWithRouter(<App />);

    const nextPokemon = getByText(/Próximo pokémon/i);

    expect(nextPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemon);
    fireEvent.click(nextPokemon);
    fireEvent.click(nextPokemon);

    const linkToDetails = getByText(/More details/i);

    expect(linkToDetails).toBeInTheDocument();

    fireEvent.click(linkToDetails);

    const gameLocationsTitle = `Game Locations of ${pokemon.name}`;

    expect(getByText(gameLocationsTitle)).toBeInTheDocument();
  });

  it('Maps', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);

    const nextPokemon = getByText(/Próximo pokémon/i);

    expect(nextPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemon);
    fireEvent.click(nextPokemon);
    fireEvent.click(nextPokemon);

    const linkToDetails = getByText(/More details/i);

    expect(linkToDetails).toBeInTheDocument();

    fireEvent.click(linkToDetails);

    const altText = `${pokemon.name} location`;

    expect(getByAltText(altText)).toBeInTheDocument();

    expect(getByAltText(altText).src).toBe(pokemon.foundAt[0].map);
  });

  it('Pokémon Details Title', () => {
    const { getByText } = renderWithRouter(<App />);

    const nextPokemon = getByText(/Próximo pokémon/i);

    expect(nextPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemon);
    fireEvent.click(nextPokemon);
    fireEvent.click(nextPokemon);

    const linkToDetails = getByText(/More details/i);

    expect(linkToDetails).toBeInTheDocument();

    fireEvent.click(linkToDetails);

    const title = `${pokemon.name} Details`;

    expect(getByText(title)).toBeInTheDocument();
  });
});
