import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemons from '../data';
import App from '../App';

afterEach(cleanup);

describe('Testando pagina Home', () => {
  test('Testando botão (Próximo pokémon)', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Próximo pokémon/i).closest('button'));
  });

  test('O botão (Próximo pokémon) deve mostrar o proximo pokmeon da lista', () => {
    const { getByText } = renderWithRouter(<App />);
    Pokemons.forEach((nomes) => {
      expect(getByText(nomes.name)).toBeInTheDocument();
      fireEvent.click(getByText(/Próximo pokémon/i).closest('button'));
    });
  });

  test('Quando chegar ao último pokémon da lista, retonar ao primeiro', () => {
    const { getByText } = renderWithRouter(<App />);
    for (let i = 0; i < Pokemons.length; i += 1) {
      fireEvent.click(getByText(/Próximo pokémon/i).closest('button'));
    }
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  test('Exibir apenas um pokémon por vez', () => {
    const { container } = renderWithRouter(<App />);
    expect(container.querySelectorAll('[data-testid="pokemon-name"]').length).toBe(1);
  });

  test('A partir da seleção circular somente pelos pokémons daquele tipo, ', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    getAllByTestId('pokemon-type-button').forEach((button) => {
      fireEvent.click(button);
      const pokeType = Pokemons.filter((pokemon) => pokemon.type === button);
      for (let i = 0; i < pokeType.length; i += 1) {
        expect(getByTestId(pokeType)).toHaveTextContent('button');
        fireEvent.click(getByTestId('next-pokemon'));
      }
    });
  });

  test('O texto do botão deve ser o nome do tipo', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Fire/i).closest('button'));
    expect(getByTestId('pokemonType')).toHaveTextContent('Fire');
  });

  test('O texto do botão deve ser All', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('All')).toBeInTheDocument();
  });

  test('Após clicá-lo, a Pokédex deve voltar a circular por todos os pokémons', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByText('All'));
    Pokemons.forEach((poke) => {
      expect(getByText(poke.name)).toBeInTheDocument();
      fireEvent.click(getByTestId('next-pokemon'));
    });
  });

  test('Quando a página carregar, o filtro selecionado deve ser o All', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    Pokemons.forEach((item) => {
      expect(getByText(item.name)).toBeInTheDocument();
      fireEvent.click(getByTestId('next-pokemon'));
    });
  });

  test('Gerar dinamicamente um botão de filtro para cada tipo de pokémon', () => {
    const { queryAllByTestId } = renderWithRouter(<App />);
    const pokemonsTypes = Pokemons.map((pokemon) => pokemon.type);
    const pokemonsTypesFiltered = [...new Set(pokemonsTypes)];
    pokemonsTypesFiltered.push('All');
    const pokemonsTypesSorted = pokemonsTypesFiltered.sort();

    const typesButtons = queryAllByTestId('pokemon-type-button');
    const typesButtonsText = typesButtons.map((button) => button.textContent);
    typesButtonsText.push('All');
    const typesButtonsTextSorted = typesButtonsText.sort();

    expect(typesButtonsTextSorted).toEqual(pokemonsTypesSorted);
  });

  test('Desabilitar botão `Próximo pokémon` ', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const typesButtons = getAllByTestId('pokemon-type-button');

    typesButtons.forEach((button) => {
      const currentPokemon = getByTestId('pokemon-name');
      fireEvent.click(button);
      const nextPokemon = getByTestId('pokemon-name');
      const pokemonsType = Pokemons.filter((item) => item.type === button.textContent);
      if (pokemonsType.length === 1) expect(currentPokemon === nextPokemon);
    });
  });
});
