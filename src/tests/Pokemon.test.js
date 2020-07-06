import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';

const Pokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: { value: '6.0', measurementUnit: 'kg' },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [[Object], [Object]],
    summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: { value: '8.5', measurementUnit: 'kg' },
    image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [[Object], [Object], [Object], [Object]],
    summary: 'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.',
  },
  {
    id: 23,
    name: 'Ekans',
    type: 'Poison',
    averageWeight: { value: '6.9', measurementUnit: 'kg' },
    image: 'https://cdn.bulbagarden.net/upload/1/18/Spr_5b_023.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)',
    foundAt: [[Object]],
    summary: 'It can freely detach its jaw to swallow large prey whole. It can become too heavy to move, however.',
  },
];

afterEach(cleanup);

describe('Testando pagina Pokemon', () => {
  test('Deve ser retornado um card com as informações de determinado pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-name')).toBeInTheDocument();
    expect(getByTestId('pokemonType')).toBeInTheDocument();
    expect(getByTestId('pokemon-weight')).toBeInTheDocument();
  });

  test('Testando nome correto do pokémon deve aparecer na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(getByTestId('pokemonType')).toHaveTextContent('Electric');
  });

  test('Testando peso médio do pokémon deve ser no formato `Average weight', () => {
    const { getByText } = renderWithRouter(<Pokemon pokemon={Pokemons[0]} />);
    const weightPoke = getByText(`Average weight:${Pokemons[0].averageWeight.value}${Pokemons[0].averageWeight.measurementUnit}`);
    expect(weightPoke).toBeInTheDocument();
  });

  test('Testandoo imagem pokémon', () => {
    renderWithRouter(<Pokemon pokemon={Pokemons[0]} />);
    const img = document.querySelector('img');
    expect(img.alt).toBe(`${Pokemons[0].name} sprite`);
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Testando link Detalhes pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/i);
    expect(moreDetails.href).toMatch(`/pokemons/${Pokemons[0].id}`);
  });

  test('Testando link de navegação do pokémon, para a página de detalhes de pokémon', () => {
    renderWithRouter(<Pokemon pokemon={Pokemons[0]} />);
    const path = `/pokemons/${Pokemons[0].id}`;
    expect(document.querySelector('a').href.includes(path)).toBeTruthy();
  });

  test('Pokémons favoritados devem exibir um ícone de uma estrela', () => {
    renderWithRouter(<Pokemon pokemon={Pokemons[0]} isFavorite />);
    expect(document.querySelector('.favorite-icon').src.includes('/star-icon.svg')).toBeTruthy();
    expect(document.querySelector('.favorite-icon').alt).toBe(`${Pokemons[0].name} is marked as favorite`);
  });
});
