import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../Helper/renderWithRouter';
import data from '../data';
import App from '../App';


const pokemonTypes = [
  ...new Set(data.reduce((types, { type }) => [...types, type], [])),
];

afterEach(cleanup);

describe('Teste Pokedex', () => {
  test('Heading h2', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/' });
    const title = getByText(/Encountered pokémons/i);

    expect(title).toBeInTheDocument();
  });

  test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
    const { getByTestId } = renderWithRouter(<App />, { route: '/' });
    const button = getByTestId('next-pokemon');

    expect(button).toBeInTheDocument();
    expect(button.type).toBe('button');
    expect(button.textContent).toBe('Próximo pokémon');
  });

  test('Button clicks', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />, { route: '/' });
    const button = getByTestId('next-pokemon');

    data.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(button);
    });

    data.forEach(() => fireEvent.click(button));
    expect(getByText(data[0].name)).toBeInTheDocument();
  });

  test('Filter buttons with the name equal the type', () => {
    const { getAllByTestId } = renderWithRouter(<App />, { route: '/' });

    pokemonTypes.forEach((type, i) => {
      const button = getAllByTestId('pokemon-type-button')[i];
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(type);
    });
  });

  test('Filter button should shows just pokemons of that type', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />, { route: '/' });

    const button = getByText('Próximo pokémon');

    pokemonTypes.forEach((type, i) => {
      const typeButton = getAllByTestId('pokemon-type-button')[i];

      fireEvent.click(typeButton);

      const filtredPokemons = data.filter((pokemon) => pokemon.type === type);

      filtredPokemons.forEach((pokemon, _, array) => {
        expect(getByText(pokemon.name)).toBeInTheDocument();
        if (array.length > 1) fireEvent.click(button);
      });
    });
  });

  test('Reset button', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/' });
    const reset = getByText(/all/i);

    expect(reset).toBeInTheDocument();
    fireEvent.click(reset);
    expect(getByText(data[0].name)).toBeInTheDocument();
  });

  test('Pokedex page should a button filter for each type of pokemon', () => {
    const { getByText, getAllByText } = renderWithRouter(<App />, { route: '/' });

    pokemonTypes.forEach((type) => {
      const button = getAllByText(type)[1] || getByText(type);
      expect(button).toBeInTheDocument();
    });

    const reset = getByText(/all/i);
    expect(reset).toBeInTheDocument();
  });

  test('O botão de Próximo pokémon deve ser desabilitado se a lista filtrada de pokémons tiver um só pokémon', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />, { route: '/' });
    const button = getByTestId('next-pokemon');

    const bugType = getByText('Bug');

    fireEvent.click(bugType);

    expect(button).toBeDisabled();
  });
});
