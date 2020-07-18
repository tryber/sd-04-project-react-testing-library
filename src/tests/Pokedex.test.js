import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

const types = [];
pokemons.forEach((pokemon) => {
  if (!types.includes(pokemon.type)) types.push(pokemon.type);
});

describe('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  test('O botão deve conter o texto `Próximo pokémon`', () => {
    const { getByTestId } = renderWithRouter(<App />);
    expect(getByTestId('next-pokemon')).toHaveTextContent('Próximo pokémon');
  });

  test('Cliques sucessivos no botão devem mostrar o próximo pokémon da lista', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByTestId('next-pokemon'));
    });
  });

  test('Ao se chegar ao último pokémon da lista, a Pokédex deve voltar para o primeiro pokémon no apertar do botão', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    for (let i = 0; i < 9; i += 1) {
      fireEvent.click(getByTestId('next-pokemon'));
    }
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});

test('A Pokédex deve exibir apenas um pokémon por vez', () => {
  const { getAllByTestId, getByText } = renderWithRouter(<App />);
  expect(getAllByTestId('pokemon-name').length).toBe(1);
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('A Pokédex deve conter botões de filtro', () => {
  test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    const { getByTestId, queryAllByTestId, getByText } = renderWithRouter(<App />);

    const next = getByTestId('next-pokemon');
    const buttons = queryAllByTestId('pokemon-type-button');

    types.forEach((type) => {
      const btn = buttons.find((element) => element.textContent === type);
      fireEvent.click(btn);

      expect(btn).toHaveTextContent(type);
      const pokemonByType = pokemons.filter((pokemon) => pokemon.type === type);

      pokemonByType.forEach((pokemon) => {
        expect(getByText(pokemon.name)).toBeInTheDocument();
        if (!next.disabled) {
          fireEvent.click(next);
        }
      });
    });
  });

  test('O texto do botão deve ser o nome do tipo, p. ex. Psychic`', () => {
    const { queryAllByTestId, getByTestId } = renderWithRouter(<App />);
    const buttons = queryAllByTestId('pokemon-type-button');

    buttons.forEach((button) => {
      fireEvent.click(button);
      const type = button.textContent;
      const pokemonType = getByTestId('pokemonType').textContent;
      expect(pokemonType).toBe(type);
    });
  });
});

describe('A Pokédex deve conter um botão para resetar o filtro', () => {
  test('O texto do botão deve ser `All`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('All')).toBeInTheDocument();
  });

  test('Após clicá-lo, a Pokédex deve voltar a circular por todos os pokémons', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByText('All'));
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByTestId('next-pokemon'));
    });
  });

  test('Quando a página carrega, o filtro selecionado deve ser o `All`', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByTestId('next-pokemon'));
    });
  });
});

test('O botão de `Próximo pokémon` deve ser desabilitado se a lista filtrada de pokémons tiver um só pokémon', () => {
  const { getByTestId, queryAllByTestId } = renderWithRouter(<App />);
  const next = getByTestId('next-pokemon');
  const buttons = queryAllByTestId('pokemon-type-button');

  types.forEach((type) => {
    const btn = buttons.find((element) => element.textContent === type);
    fireEvent.click(btn);

    const pokemonByType = pokemons.filter((pokemon) => pokemon.type === type);

    pokemonByType.forEach(() => {
      if (pokemonByType.length === 1) {
        expect(next.disabled).toBeTruthy();
      }
    });
  });
});
