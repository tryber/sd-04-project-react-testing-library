import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

const pokeMock = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: { value: '6.0', measurementUnit: 'kg' },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [[Object], [Object]],
    summary:
      'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: { value: '8.5', measurementUnit: 'kg' },
    image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [[Object], [Object], [Object], [Object]],
    summary:
      'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.',
  },
  {
    id: 23,
    name: 'Ekans',
    type: 'Poison',
    averageWeight: { value: '6.9', measurementUnit: 'kg' },
    image: 'https://cdn.bulbagarden.net/upload/1/18/Spr_5b_023.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)',
    foundAt: [[Object]],
    summary:
      'It can freely detach its jaw to swallow large prey whole. It can become too heavy to move, however.',
  },
  {
    id: 65,
    name: 'Alakazam',
    type: 'Psychic',
    averageWeight: {
      value: '48.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Unova Accumula Town',
        map: 'https://cdn.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png',
      },
    ],
    summary:
      'Closing both its eyes heightens all its other senses. This enables it to use its abilities to their extremes.',
  },
  {
    id: 151,
    name: 'Mew',
    type: 'Psychic',
    averageWeight: {
      value: '4.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/4/43/Spr_5b_151.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Faraway Island',
        map: 'https://cdn.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png',
      },
    ],
    summary:
      'Apparently, it appears only to those people who are pure of heart and have a strong desire to see it.',
  },
];
afterEach(cleanup);

describe('Requisito 7', () => {
  const match = {
    params: {
      id: pokeMock[0].id,
    },
  };
  test('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails isPokemonFavoriteById={pokeMock[0].id} match={match} pokemons={pokeMock} />,
    );
    const heading = getByText(`${pokeMock[0].name} Details`);
    expect(heading).toBeInTheDocument();
  });

  test('Deve conter mais informações sobre apenas o pokémon selecionado;', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails isPokemonFavoriteById={pokeMock[1].id} match={match} pokemons={pokeMock} />,
    );
    const textDetail = getByText(pokeMock[0].summary);
    expect(textDetail).toBeInTheDocument();
  });

  test('O pokémon exibido na página de detalhes não deve conter um link de navegação para exibir detalhes deste pokémon;', () => {
    renderWithRouter(
      <PokemonDetails isPokemonFavoriteById={pokeMock[2].id} match={match} pokemons={pokeMock} />,
    );
    expect(document.querySelector('a')).toBeNull();
    expect(document.querySelectorAll('container').textContent).not.toBe('More details');
  });

  test('A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado;', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails isPokemonFavoriteById={pokeMock[3].id} match={match} pokemons={pokeMock} />,
    );

    expect(getByText(pokeMock[0].summary)).toBeInTheDocument();
    expect(getByText(pokeMock[0].summary).tagName).toBe('P');
  });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails isPokemonFavoriteById={pokeMock[4].id} match={match} pokemons={pokeMock} />,
    );

    expect(getByText('Summary')).toBeInTheDocument();
    expect(getByText('Summary').tagName).toBe('H2');
  });
  test('There must be a name and an image of the location.', () => {
    const url1 = 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const url2 = 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    const { getByText, getAllByAltText } = renderWithRouter(
      <PokemonDetails isPokemonFavoriteById={25} match={match} pokemons={pokemons} />,
    );
    expect(getAllByAltText(`${pokeMock[0].name} location`).length).toBe(2);
    const imgs = getAllByAltText(`${pokeMock[0].name} location`);
    imgs.forEach((mapa) => {
      console.log(mapa.src);
      expect(mapa.src === url1 || mapa.src === url2).toBe(true);
    });
    expect(getByText('Kanto Viridian Forest')).toBeDefined();
    expect(getByText('Kanto Power Plant')).toBeDefined();
  });

  test('The checkbox label must be a "favorite Pokémon ?".', () => {
    // const url1 = 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    // const url2 = 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    const { getByText } = renderWithRouter(
      <PokemonDetails isPokemonFavoriteById={25} match={match} pokemons={pokemons} />,
    );
    expect(getByText('Pokémon favoritado?')).toBeDefined();
  });
});
