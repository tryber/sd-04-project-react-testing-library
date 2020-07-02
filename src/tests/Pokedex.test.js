import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';
import App from '../App';

const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

afterEach(cleanup);

describe('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  test('O botão deve conter o texto Próximo pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const nextButton = getByTestId('next-pokemon');
    expect(nextButton).toHaveTextContent('Próximo pokémon');
  });
  test('Cliques sucessivos no botão devem mostrar o próximo pokémon da lista;', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByTestId('next-pokemon'));
    });
  });
  test('Ao se chegar ao último pokémon da lista, a Pokédex deve voltar para o primeiro pokémon no apertar do botão.', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    pokemons.forEach(() => fireEvent.click(getByTestId('next-pokemon')));
    expect(getByText(pokemons[0].name)).toBeInTheDocument();
  });
});

describe('A Pokédex deve exibir apenas um pokémon por vez', () => {
  test('A Pokédex deve exibir apenas um pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const test = getAllByTestId('pokemon-name');
    expect(test.length).toBe(1);
  });
});

describe('A Pokédex deve conter botões de filtro', () => {
  test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    const { getAllByTestId, getByText, getByTestId } = renderWithRouter(<App />);
    const btn = getAllByTestId('pokemon-type-button');
    types.forEach((type) => {
      fireEvent.click(btn.find(((element) => element.textContent === type)));
      pokemons.filter((pokemon) => pokemon.type === type).forEach((element) => {
        expect(getByText(element.name)).toBeInTheDocument();
        fireEvent.click(getByTestId('next-pokemon'));
      });
    });
  });
  test('O texto do botão deve ser o nome do tipo, p. ex. Psychic', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const btn = getAllByTestId('pokemon-type-button');
    types.forEach((type) => {
      btn.find((name) => name.textContent === type);
    });
  });
});

describe('A Pokédex deve conter um botão para resetar o filtro', () => {
  test('O texto do botão deve ser All', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const allButton = getAllByRole('button')[0];
    expect(allButton).toHaveTextContent('All');
  });
  test('Após clicá-lo, a Pokédex deve voltar a circular por todos os pokémons', () => {
    const { getAllByRole, getByText, getByTestId } = renderWithRouter(<App />);
    const allButton = getAllByRole('button')[0];
    fireEvent.click(allButton);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByTestId('next-pokemon'));
    });
  });
  test('Quando a página carrega, o filtro selecionado deve ser o All', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByTestId('next-pokemon'));
    });
  });
});

describe('O botão de Próximo pokémon deve ser desabilitado se a lista filtrada de pokémons tiver um só pokémon', () => {
  test('', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const btn = getAllByTestId('pokemon-type-button');
    types.forEach((type) => {
      fireEvent.click(btn.find(((element) => element.textContent === type)));
      pokemons.filter((pokemon) => pokemon.type === type).forEach((element) => {
        if (element.length === 1) expect(getByTestId('next-pokemon').disable).toBeTruthy();
      });
    });
  });
});
