import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import data from '../data';
import renderWithRouter from '../components/renderWithRouter';

describe('Testes do requisito 5', () => {
  test('Ao apertar o botão de próximo, deve exibir o próximo pokémon da lista', () => {
    const { queryByText, getByText } = renderWithRouter(<App />);

    const btn = getByText('Próximo pokémon');
    fireEvent.click(btn);
    const poke = queryByText(data[1].name);
    expect(poke).toBeInTheDocument();
  });

  test('A pokedex deve exibir apenas um pokemon por vez', () => {
    const { getByText, getAllByText } = renderWithRouter(<App />);
    const title = getByText('Encountered pokémons');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H2');

    const allPoke = getAllByText('More details');
    expect(allPoke.length).toBe(1);
  });

  test('A pokedex deve conter botões de filtro', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);

    const typeBtn = getAllByTestId('pokemon-type-button');

    fireEvent.click(typeBtn[1]);

    const pokeType = getByTestId('pokemonType');
    expect(pokeType).toHaveTextContent('Fire');
    const nextBtn = getByTestId('next-pokemon');

    fireEvent.click(nextBtn);

    expect(pokeType).toHaveTextContent('Fire');
  });

  test('A pokedex deve conter um botão para resetar o filtro', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    const allTypes = getByText('All');

    fireEvent.click(allTypes);

    const poke = getByTestId('pokemon-name');
    expect(poke).toHaveTextContent('Pikachu');
  });

  test('A Pokédex deve gerar um botão de filtro para cada tipo de pokémon', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const typeBtn = getAllByTestId('pokemon-type-button');
    expect(typeBtn.length).toBe(7);
    expect(typeBtn[0]).toHaveTextContent('Electric');
    expect(typeBtn[2]).toHaveTextContent('Bug');
    expect(typeBtn[6]).toHaveTextContent('Dragon');
  });

  test('O botão de Próximo pokémon deve ser desabilitado', () => {
    const { getByTestId, getAllByText } = renderWithRouter(<App />);

    const btn = getByTestId('next-pokemon');
    data.forEach((poke) => {
      const pokeType = getAllByText(poke.type)[0];
      const listType = data.filter((pokemon) => pokemon.type === pokeType);
      return listType.length > 1
        ? expect(btn.not.hasAttribute('disabled'))
        : expect(btn.hasAttribute('disabled'));
    });
  });
});
