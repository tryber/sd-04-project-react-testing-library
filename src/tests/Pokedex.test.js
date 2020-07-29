import React from 'react';
import { fireEvent, getAllByTestId } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Tests da Pokedex', () => {
  test('Existe um botão com "Próximo pokémon" como texto', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Próximo pokémon').type).toBe('button');
  });

  test('Verifica cada Pokemon na lista', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByTestId('next-pokemon'));
    });
  });

  test('Verifica loop da lista', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    pokemons.forEach(() => {
      fireEvent.click(getByTestId('next-pokemon'));
    });
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  test('Apenas um pokemon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });

  test('Rotacionar somente pelos pokemons do tipo escolhido', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const allButs = getAllByTestId('pokemon-type-button');
    allButs.forEach((button) => {
      fireEvent.click(button);
      const typePok = getByTestId('pokemonType').textContent;
      const typeBut = button.textContent;
      expect(typePok).toBe(typeBut);
    });
  });

  test('Test no botão do "Psychic"', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByText('Psychic'));
    pokemons.forEach(() => {
      expect(getByTestId('pokemonType').textContent).toBe('Psychic');
    });
  });

  test('Test se o filtro "All" existe', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('All')).toBeInTheDocument();
  });

  test('Rotacionar todos pokemons', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByTestId('next-pokemon'));
    });
  });

  test('Dinamica dos tipos de botões', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    const allTypes = getAllByTestId('pokemon-type-button');
    const mapTypes = allTypes.map((button) => button.textContent);
    const pokemonsTypes = pokemons.map((pokemon) => pokemon.type);
    const onlyPokTypes = [...new Set(pokemonsTypes)];
    expect(mapTypes).toEqual(onlyPokTypes);
    expect(getByText('All')).toBeInTheDocument();
  });

  test('Desabilitar o botão proximo pokemon se só tiver um', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const butTypes = getAllByTestId('pokemon-type-button');
    butTypes.forEach((button) => {
      const atualPok = getByTestId('pokemon-name');
      fireEvent.click(button);
      const proximoPok = getByTestId('pokemon-name');
      const pokemonsType = pokemons.filter((item) => item.type === button.textContent);
      if (pokemonsType.length === 1) expect(atualPok === proximoPok);
    });
  });
});
