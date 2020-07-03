import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

describe('Testes do arquivo Pokedex.js', () => {
  afterEach(cleanup);

  test('???', () => {
    const { getByText, getAllByTestId } = render(
      <MemoryRouter initialEntries={['/']}><App /></MemoryRouter>,
    );
    const el = getByText(/Encountered pokémons/);
    const el2 = getAllByTestId('pokemon-type-button');
    expect(el).toBeInTheDocument();
    el2.forEach((but) => {
      expect(but).toBeInTheDocument();
      expect(but.textContent).not.toBe('');
    });
  })

  describe('Ao apertar "Próximo pokémon", exiba o próximo pokémon da lista', () => {
    test('O botão deve conter o texto Próximo pokémon', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['/']}><App /></MemoryRouter>,
      );
      const el = getByText(/Próximo pokémon/);
      expect(el.type).toBe('button');
    });

    test('Cliques sucessivos no botão devem mostrar o próximo pokémon da lista', () => {
      const { getByText, getByTestId } = render(
        <MemoryRouter initialEntries={['/']}><App /></MemoryRouter>,
      );
      const el = getByText(/Próximo pokémon/);
      pokemons.forEach((pokemon) => {
        expect(getByTestId('pokemon-name').textContent).toBe(pokemon.name);
        fireEvent.click(el);
      });
    });

    test('Do último pokemon deve ir para o primeiro', () => {
      const { getByText, getByTestId } = render(
        <MemoryRouter initialEntries={['/']}><App /></MemoryRouter>,
      );
      const el = getByText(/Próximo pokémon/);
      const lastPokemon = 'Dragonair';
      pokemons.forEach(() => {
        if (getByTestId('pokemon-name').textContent === lastPokemon) {
          fireEvent.click(el);
          expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');
        }
        return fireEvent.click(el);
      });
    });
  });

  test('A Pokédex deve exibir apenas um pokémon por vez', () => {
    const { getAllByTestId } = render(
      <MemoryRouter initialEntries={['/']}><App /></MemoryRouter>,
    );
    const allPokes = getAllByTestId('pokemon-name');
    expect(allPokes.length).toBe(1);
  });

  describe('A Pokédex deve conter botões de filtro', () => {
    test('Ao selecionar o tipo, deve-se circular apenas por pokémons daquele tipo', () => {
      const { getAllByRole, getByTestId } = render(
        <MemoryRouter initialEntries={['/']}><App /></MemoryRouter>,
      );
      pokemons.forEach((pokemon) => {
        getAllByRole('button').forEach((button) => {
          if (button.textContent === pokemon.type) {
            fireEvent.click(button);
            const pokeType = getByTestId('pokemonType');
            expect(button.textContent).toBe(pokeType.textContent);
          }
        });
      });
    });

    test('O texto do botão deve ser o nome do tipo, p. ex. Psychic.', () => {
      const { getAllByRole } = render(
        <MemoryRouter initialEntries={['/']}><App /></MemoryRouter>,
      );
      pokemons.forEach((pokemon) => {
        getAllByRole('button').forEach((button) => {
          if (button.textContent === pokemon.type) expect(button.textContent).toBe(pokemon.type);
        });
      });
    });
  });

  describe('A Pokédex deve conter um botão para resetar o filtro', () => {
    test('O texto do botão deve ser All', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['/']}><App /></MemoryRouter>,
      );
      const el = getByText(/All/);
      expect(el).toBeInTheDocument();
    });

    test('Após clicá-lo, deve voltar a circular por todos os pokémons', () => {
      const { getByText, getByTestId, getAllByRole } = render(
        <MemoryRouter initialEntries={['/']}><App /></MemoryRouter>,
      );
      const el = getByText(/All/);
      pokemons.forEach((pokemon) => {
        getAllByRole('button').forEach((button) => {
          if (button.textContent === pokemon.type) {
            fireEvent.click(button);
            expect(getByTestId('pokemonType').textContent).toBe(button.textContent);
            fireEvent.click(el);
            expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');
            expect(getByTestId('next-pokemon')).toBeEnabled();
          }
        });
      });
    });

    test('Quando a página carrega, o filtro selecionado deve ser o All', () => {
      const { getByTestId } = render(
        <MemoryRouter initialEntries={['/']}><App /></MemoryRouter>,
      );
      pokemons.forEach((pokemon) => {
        expect(getByTestId('pokemon-name').textContent).toBe(pokemon.name);
        fireEvent.click(getByTestId('next-pokemon'));
      });
    });
  });

  test('Os botões de filtragem por tipo devem ser dinâmicos ', () => {
    const { getAllByRole, getByText } = render(
      <MemoryRouter initialEntries={['/']}><App /></MemoryRouter>,
    );
    pokemons.forEach((pokemon) => {
      getAllByRole('button').forEach((button) => {
        if (button.textContent === pokemon.type) {
          expect(button).toBeInTheDocument();
          expect(getByText(/All/)).toBeInTheDocument();
        }
      });
    });
  });

  test('Desabilitar botão "Próximo pokémon" caso haja somente um', () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter initialEntries={['/']}><App /></MemoryRouter>,
    );
    const uniTypes = pokemons.filter((pokemon) => {
      const types = pokemons.filter((poke) => {
        if (pokemon.type === poke.type) return true;
        return false;
      });
      if (types.length > 1) return false;
      return true;
    });
    uniTypes.forEach((pokemon) => {
      getAllByRole('button').forEach((button) => {
        if (button.textContent === pokemon.type) {
          fireEvent.click(button);
          expect(getByText(/Próximo pokémon/)).toBeDisabled();
        }
      });
    });
  });
});
