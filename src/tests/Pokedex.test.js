import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import Data from '../data';

const types = Data.reduce((acc, pokemon) => {
  if (!acc[pokemon.type]) acc[pokemon.type] = [];
  if (acc[pokemon.type]) {
    acc[pokemon.type].push(pokemon);
    return acc;
  }
  return acc;
}, {});
function PassandoPokemons(getByText) {
  Data.forEach(({ name }) => {
    const nextPokemon = getByText('Próximo pokémon');
    expect(getByText(name)).toBeInTheDocument();
    fireEvent.click(nextPokemon);
  });
}

describe('Testando o botoes da pokedex', () => {
  afterEach(cleanup);

  test('Testando o botão de proximo ativo', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const nextPokemon = getByTestId('next-pokemon');
    const firstPokemon = getByTestId('pokemon-name').innerHTML;

    getByText('Encountered pokémons');
    expect(nextPokemon).toBeInTheDocument();
    expect(nextPokemon.disabled).toBe(false);
    fireEvent.click(nextPokemon);

    const secondPokemon = getByTestId('pokemon-name').innerHTML;
    expect(firstPokemon).not.toBe(secondPokemon);
  });

  test('Testando o botão de proximo inativo', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const nextPokemon = getByTestId('next-pokemon');
    const buttons = getAllByTestId('pokemon-type-button');

    fireEvent.click(buttons[2]);
    expect(nextPokemon.disabled).toBe(true);
  });

  test('testando se o ultimo pokemon volta para o primeir', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const nextPokemon = getByTestId('next-pokemon');

    Data.forEach(() => fireEvent.click(nextPokemon));
    expect(getByText(Data[0].name)).toBeInTheDocument();
  });

  test('Testando se renderiza só um pokemon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemon = getAllByTestId('pokemon-name');

    expect(pokemon.length).toBe(1);
  });

  test('testando os botoes de tipo', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const typeButtons = getAllByTestId('pokemon-type-button');

    Object.keys(types).forEach((type, index) => {
      expect(typeButtons[index]).toBeInTheDocument();
      expect(typeButtons[index]).toHaveTextContent(type);
    });
  });

  test('Testando All button', () => {
    const { getByText } = renderWithRouter(<App />);
    const AllButton = getByText('All');

    expect(AllButton).toBeInTheDocument();
    fireEvent.click(AllButton);
    PassandoPokemons(getByText);
  });
});

test('Testando os botoes de filtro', () => {});

test('', () => {});
