import { fireEvent } from '@testing-library/react';
import React from 'react';
import renderWithRouter from './services/renderWithRouter';
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

describe('Requisito 6, Pokemon', () => {
  test('O nome correto do pokémon deve aparecer na tela;', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });
  test('O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> ', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const average = `Average weight:${pokemon.averageWeight.value}${pokemon.averageWeight.measurementUnit}`;
    expect(getByTestId('pokemon-weight').textContent).toBe(average);
  });
  test('A imagem deve conter um atributo src com a URL da imagem do pokémon.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const img = getByRole('img');
    expect(img.src).toBe(pokemon.image);
    expect(img.alt).toBe(`${pokemon.name} sprite`);
  });
  test('O pokémon exibido na Pokédex deve conter um link de navegação para exibir detalhes deste pokémon.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const moredetails = getByText(/More Details/i);
    expect(moredetails).toBeInTheDocument();
    fireEvent.click(moredetails);
    expect(history.location.pathname).toBe(`/pokemons/${pokemon.id}`);
  });
  test('Pokémons favoritados devem exibir um ícone de uma estrela', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const moredetails = getByText(/More Details/i);
    expect(moredetails).toBeInTheDocument();
    fireEvent.click(moredetails);
    const favorite = getByText(/Pokémon favoritado/i);
    fireEvent.click(favorite);
    const img = getAllByRole('img')[1];
    expect(img.src).toBe('http://localhost/star-icon.svg');
    expect(img.alt).toBe(`${pokemon.name} is marked as favorite`);
  });
});
