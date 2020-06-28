import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';

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
      <PokemonDetails isPokemonFavoriteById={pokeMock[0].id} match={match} pokemons={pokeMock} />,
    );
    const textDetail = getByText(pokeMock[0].summary);
    expect(textDetail).toBeInTheDocument();
  });

  test('O pokémon exibido na página de detalhes não deve conter um link de navegação para exibir detalhes deste pokémon;', () => {
    const {} = renderWithRouter(
      <PokemonDetails isPokemonFavoriteById={pokeMock[0].id} match={match} pokemons={pokeMock} />,
    );
    expect(document.querySelector('a')).toBeNull();
    expect(document.querySelectorAll('container').textContent).not.toBe('More details');
  });

  test('A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado;', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails isPokemonFavoriteById={pokeMock[0].id} match={match} pokemons={pokeMock} />,
    );

    expect(getByText(pokeMock[0].summary)).toBeInTheDocument();
    expect(getByText(pokeMock[0].summary).tagName).toBe('P');
  });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails isPokemonFavoriteById={pokeMock[0].id} match={match} pokemons={pokeMock} />,
    );

    expect(getByText('Summary')).toBeInTheDocument();
    expect(getByText('Summary').tagName).toBe('H2');
  });
});
