import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../helpers/renderWithRouter';
import Pokemon from '../components/Pokemon';

const pokemonInfo = {
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

describe('Testes do arquivo Pokemon.js', () => {
  afterEach(cleanup);

  test('O nome correto do pokémon deve aparecer na tela', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={pokemonInfo} isFavorite={false} />,
    );
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe(pokemonInfo.name);
  });

  test('O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>, onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={pokemonInfo} isFavorite={false} />,
    );
    const averageWeight = getByTestId('pokemon-weight');
    const {
      averageWeight: { value, measurementUnit },
    } = pokemonInfo;
    expect(averageWeight.innerHTML).toBe(
      `Average weight:${value}${measurementUnit}`,
    );
  });

  test('A imagem deve conter um atributo src com a URL da imagem do pokémon. A imagem deverá ter também um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={pokemonInfo} isFavorite={false} />,
    );
    const nome = getByAltText(`${pokemonInfo.name} sprite`);
    expect(nome.getAttribute('alt')).toBe(`${pokemonInfo.name} sprite`);
  });

  test('O pokémon exibido na Pokédex deve conter um link de navegação para exibir detalhes deste pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é o id do pokémon exibido', () => {
    const { getByText } = renderWithRouter(
      <Pokemon pokemon={pokemonInfo} isFavorite={false} />,
    );
    const button = getByText(/More Details/i);
    expect(button.getAttribute('href')).toBe('/pokemons/25');
  });

  test('Ao clicar no link de navegação do pokémon, a aplicação deve ser redirecionada para a página de detalhes de pokémon. A URL exibida no navegador deve mudar para /pokemon/<id>, onde <id> é o id do pokémon cujos detalhes se deseja ver', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon pokemon={pokemonInfo} isFavorite={false} />,
    );
    const button = getByText(/More Details/i);
    fireEvent.click(button);
    expect(history.location.pathname).toBe(`/pokemons/${pokemonInfo.id}`);
  });

  test('Pokémons favoritados devem exibir um ícone de uma estrela', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={pokemonInfo} isFavorite />,
    );
    const starImage = getByAltText(`${pokemonInfo.name} is marked as favorite`);
    expect(starImage.src).toMatch(/\/star-icon.svg/);
  });
});
