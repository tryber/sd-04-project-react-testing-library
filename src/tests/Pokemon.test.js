import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import Pokemon from '../components/Pokemon';

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

describe('Requisito 6', () => {
  test('Deve ser retornado um card com as informações de determinado pokémon;', () => {
    const { container } = renderWithRouter(<Pokemon pokemon={pokeMock[0]} />);
    expect(container.querySelector('div.pokemon')).toBeDefined();
  });

  test('O nome correto do pokémon deve aparecer na tela;', () => {
    const { getByText } = renderWithRouter(<Pokemon pokemon={pokeMock[0]} />);
    const pokeName = getByText(pokeMock[0].name);
    expect(pokeName).toBeInTheDocument();
  });

  test('O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>, onde <value> e <measurementUnit>', () => {
    const { getByText } = renderWithRouter(<Pokemon pokemon={pokeMock[0]} />);
    const formatData = getByText(
      `Average weight:${pokeMock[0].averageWeight.value}${pokeMock[0].averageWeight.measurementUnit}`,
    );
    expect(formatData).toBeInTheDocument();
  });

  test('A imagem deve conter um atributo src com a URL da imagem do pokémon. A imagem deverá ter também um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon', () => {
    renderWithRouter(<Pokemon pokemon={pokeMock[0]} />);
    const img = document.querySelector('img');

    expect(img.alt).toBe(`${pokeMock[0].name} sprite`);
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Should contain a link to details.', () => {
    renderWithRouter(<Pokemon pokemon={pokeMock[0]} />);
    const path = `/pokemons/${pokeMock[0].id}`;

    expect(document.querySelector('a').href.includes(path)).toBeTruthy();
  });

  test('Ao clicar no link de navegação do pokémon, a aplicação deve ser redirecionada para a página de detalhes de pokémon. A URL exibida no navegador deve mudar para /pokemon/<id>, onde <id> é o id do pokémon cujos detalhes se deseja ver', () => {
    const { getByText, history } = renderWithRouter(<Pokemon pokemon={pokeMock[0]} />);
    fireEvent.click(getByText('More details'));
    expect(history.location.pathname).toBe(`/pokemons/${pokeMock[0].id}`);
  });

  test('O ícone deve ser uma imagem, com o atributo src igual /star-icon.svg', () => {
    const { getByText } = renderWithRouter(<Pokemon pokemon={pokeMock[0]} isFavorite={true} />);
    expect(document.querySelector('.favorite-icon').src.includes('/star-icon.svg')).toBeTruthy();
    expect(document.querySelector('.favorite-icon').alt).toBe(
      `${pokeMock[0].name} is marked as favorite`,
    );
  });
});
