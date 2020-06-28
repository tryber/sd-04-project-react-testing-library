import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Pokemon } from '../components';
import renderWithRouter from './RenderWithRouter';

const pokeInfo = {
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

describe('Deve ser retornado um card com as informações de determinado pokémon', () => {
  test('O tipo correto do pokemon deve ser exibido e possuir o data-testid pokemonType', () => {
    const { getByTestId } = renderWithRouter(<Pokemon pokemon={pokeInfo} isFavorite={false} />);
    const type = getByTestId('pokemonType');
    expect(type.textContent).toBe(pokeInfo.type);
  });

  test('O nome correto do pokémon deve aparecer na tela', () => {
    const { getByTestId } = renderWithRouter(<Pokemon pokemon={pokeInfo} isFavorite={false} />);
    const name = getByTestId('pokemon-name');
    expect(name.textContent).toBe(pokeInfo.name);
  });

  test(`O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>, 
  onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida`, () => {
    const { getByTestId } = renderWithRouter(<Pokemon pokemon={pokeInfo} isFavorite={false} />);
    const weight = getByTestId('pokemon-weight');
    const { averageWeight: { value, measurementUnit } } = pokeInfo;
    expect(weight.textContent).toBe(`Average weight:${value}${measurementUnit}`);
  });

  test(`A imagem deve conter um atributo src com a URL da imagem do pokémon. 
  A imagem deverá ter também um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon`, () => {
    const { getByAltText } = renderWithRouter(<Pokemon pokemon={pokeInfo} isFavorite={false} />);
    const img = getByAltText(`${pokeInfo.name} sprite`);
    expect(img.src).toBe(pokeInfo.image);
  });
  const reg = new RegExp(`/pokemons/${pokeInfo.id}`);
  test(`O pokémon exibido na Pokédex deve conter um link de navegação para exibir detalhes deste pokémon. 
  O link deve possuir a URL /pokemons/<id>, onde <id> é o id do pokémon exibido`, () => {
    const { getByText } = renderWithRouter(<Pokemon pokemon={pokeInfo} isFavorite={false} />);
    const link = getByText('More details');
    expect(link.href).toMatch(reg);
  });

  test(`Ao clicar no link de navegação do pokémon, a aplicação deve ser redirecionada para a página de detalhes 
  de pokémon. A URL exibida no navegador deve mudar para /pokemon/<id>, onde <id> é o id do pokémon cujos detalhes se deseja ver;`, () => {
    const {
      history,
      getByText,
    } = renderWithRouter(<Pokemon pokemon={pokeInfo} isFavorite={false} />);
    const link = getByText('More details');
    fireEvent.click(link);
    const { location: { pathname } } = history;
    expect(pathname).toMatch(reg);
  });
});

describe('Pokémons favoritados devem exibir um ícone de uma estrela', () => {
  test(`A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde <pokemon> 
é o nome do pokémon cujos detalhes estão sendo exibidos.`, () => {
    const { getByAltText } = renderWithRouter(<Pokemon pokemon={pokeInfo} isFavorite />);
    const img = getByAltText(`${pokeInfo.name} is marked as favorite`);
    expect(img).toBeInTheDocument();
  });

  test('O ícone deve ser uma imagem, com o atributo src igual /star-icon.svg', () => {
    const { getByAltText } = renderWithRouter(<Pokemon pokemon={pokeInfo} isFavorite />);
    const img = getByAltText(`${pokeInfo.name} is marked as favorite`);
    expect(img.src).toMatch(/\/star-icon.svg/);
  });
});
