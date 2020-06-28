import React from 'react';
import { fireEvent } from '@testing-library/react';
import pokemons from '../data';
import { Pokedex } from '../components';
import renderWithRouter from './RenderWithRouter';

const favs = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const types = [...new Set(pokemons.reduce((all, { type }) => [...all, type], []))];

test('O texto Encountered pokémons deve ser renderizado', () => {
  const { getByText } = renderWithRouter(
    <Pokedex pokemons={pokemons} isPokemonFavoriteById={favs} />,
  );
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  test('O botão deve conter o texto Próximo pokémon', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favs} />,
    );
    const button = getByTestId('next-pokemon');
    expect(button.textContent).toBe('Próximo pokémon');
  });

  test('Cliques sucessivos no botão devem mostrar o próximo pokémon da lista', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favs} />,
    );
    const button = getByTestId('next-pokemon');
    pokemons.forEach((poke) => {
      expect(getByTestId('pokemon-name').textContent).toBe(poke.name);
      fireEvent.click(button);
    });
  });

  test('Ao se chegar ao último pokémon da lista, a Pokédex deve voltar para o primeiro pokémon no apertar do botão', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favs} />,
    );
    const button = getByTestId('next-pokemon');
    pokemons.forEach(() => {
      fireEvent.click(button);
    });
    expect(getByTestId('pokemon-name').textContent).toBe(pokemons[0].name);
  });
});

test('A Pokédex deve exibir apenas um pokémon por vez', () => {
  const { getAllByTestId } = renderWithRouter(
    <Pokedex pokemons={pokemons} isPokemonFavoriteById={favs} />,
  );
  const pokes = getAllByTestId('pokemon-name');
  expect(pokes.length).toBe(1);
});

describe('A Pokédex deve conter botões de filtro', () => {
  test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favs} />,
    );
    const typeBtns = getAllByTestId('pokemon-type-button');
    typeBtns.forEach((btn) => {
      fireEvent.click(btn);
      const type = btn.textContent;
      const poketype = getByTestId('pokemonType').textContent;
      expect(poketype).toBe(type);
    });
  });

  test('O texto do botão deve ser o nome do tipo, p. ex. Psychic', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favs} />,
    );
    const typeBtns = getAllByTestId('pokemon-type-button');
    typeBtns.forEach((btn) => {
      const isType = types.includes(btn.textContent);
      expect(isType).toBeTruthy();
    });
  });
});

describe('A Pokédex deve conter um botão para resetar o filtro', () => {
  test('O texto do botão deve ser All', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favs} />,
    );
    const btn = getByText('All');
    expect(btn).toBeInTheDocument();
  });

  test('Após clicá-lo, a Pokédex deve voltar a circular por todos os pokémons', () => {
    const { getByText, getAllByTestId, getByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favs} />,
    );
    const typeBtn = getAllByTestId('pokemon-type-button')[0];
    const btn = getByText('All');
    const nextBtn = getByTestId('next-pokemon');
    fireEvent.click(typeBtn);
    fireEvent.click(btn);
    pokemons.forEach((poke) => {
      expect(getByTestId('pokemon-name').textContent).toBe(poke.name);
      fireEvent.click(nextBtn);
    });
  });

  test('Quando a página carrega, o filtro selecionado deve ser o All', () => {
    // Exatamente o mesmo teste de cliques sucessivos não vejo outra forma de testar o filtro
    const { getByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favs} />,
    );
    const button = getByTestId('next-pokemon');
    pokemons.forEach((poke) => {
      expect(getByTestId('pokemon-name').textContent).toBe(poke.name);
      fireEvent.click(button);
    });
  });
});

describe('A Pokédex deve gerar, dinamicamente, um botão de filtro para cada tipo de pokémon', () => {
  test(`Os botões de filtragem devem ser dinâmicos: sua Pokédex deve gerar um botão de filtragem 
  para cada tipo de pokémon disponível nos dados independente de quais ou quantos sejam, sem repetição
  de tipos. Ou seja, se sua Pokédex possui pokémons do tipo Fire, Psychic, Electric e Normal, deve aparecer
  como opção de filtro um botão para cada um desses tipos. Além disso, ela deve manter obotão All`, () => {
    const { getByText, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favs} />,
    );
    const allTypes = getAllByTestId('pokemon-type-button').map((btn) => btn.textContent);
    expect(allTypes).toEqual(types);
    const allBtn = getByText('All');
    expect(allBtn).toBeInTheDocument();
  });
});

test('O botão de Próximo pokémon deve ser desabilitado se a lista filtrada de pokémons tiver um só pokémon', () => {
  const { getByText, getByTestId } = renderWithRouter(
    <Pokedex pokemons={pokemons} isPokemonFavoriteById={favs} />,
  );
  types.forEach((typ) => {
    const filtered = pokemons.filter((poke) => poke.type === typ);
    const typeBtn = getByText((content, node) => content === typ && node.type === 'button');
    fireEvent.click(typeBtn);
    const nextBtn = getByTestId('next-pokemon');
    expect(nextBtn.disabled).toBe(filtered.length === 1);
  });
});
