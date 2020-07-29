import React from 'react';
import { render, fireEvent, getAllByTestId } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import pokemons from '../data';

describe('Tests da Pokedex', () => {
  test('Existe um botão com "Próximo pokémon" como texto', () => {
    const historico = createMemoryHistory();
		const { getByText } = render(
    <Router history={historico}>
      {<App />}
    </Router>);
    expect(getByText('Próximo pokémon').type).toBe('button');
  });

  test('Verifica cada Pokemon na lista', () => {
    const historico = createMemoryHistory();
		const { getByText, getByTestId } = render(
    <Router history={historico}>
      {<App />}
    </Router>);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByTestId('next-pokemon'));
    });
  });

  test('Verifica loop da lista', () => {
    const historico = createMemoryHistory();
		const { getByText, getByTestId } = render(
    <Router history={historico}>
      {<App />}
    </Router>);
    pokemons.forEach(() => {
      fireEvent.click(getByTestId('next-pokemon'));
    });
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  test('Apenas um pokemon por vez', () => {
    const historico = createMemoryHistory();
		const { getAllByTestId } = render(
    <Router history={historico}>
      {<App />}
    </Router>);
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });

  test('Rotacionar somente pelos pokemons do tipo escolhido', () => {
    const historico = createMemoryHistory();
		const { getByTestId, getAllByTestId } = render(
    <Router history={historico}>
      {<App />}
    </Router>);
    const allButs = getAllByTestId('pokemon-type-button');
    allButs.forEach((button) => {
      fireEvent.click(button);
      const typePok = getByTestId('pokemonType').textContent;
      const typeBut = button.textContent;
      expect(typePok).toBe(typeBut);
    });
  });

  test('Test no botão do "Psychic"', () => {
    const historico = createMemoryHistory();
		const { getByText, getByTestId } = render(
    <Router history={historico}>
      {<App />}
    </Router>);
    fireEvent.click(getByText('Psychic'));
    pokemons.forEach(() => {
      expect(getByTestId('pokemonType').textContent).toBe('Psychic');
    });
  });

  test('Test se o filtro "All" existe', () => {
    const historico = createMemoryHistory();
		const { getByText } = render(
    <Router history={historico}>
      {<App />}
    </Router>);
    expect(getByText('All')).toBeInTheDocument();
  });

  test('Rotacionar todos pokemons', () => {
    const historico = createMemoryHistory();
		const { getByText, getByTestId } = render(
    <Router history={historico}>
      {<App />}
    </Router>);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByTestId('next-pokemon'));
    });
  });

  test('Dinamica dos tipos de botões', () => {
    const historico = createMemoryHistory();
		const { getByText, getAllByTestId } = render(
    <Router history={historico}>
      {<App />}
    </Router>);
    const allTypes = getAllByTestId('pokemon-type-button');
    const mapTypes = allTypes.map((button) => button.textContent);
    const pokemonsTypes = pokemons.map((pokemon) => pokemon.type);
    const onlyPokTypes = [... new Set(pokemonsTypes)];
    expect(mapTypes).toEqual(onlyPokTypes);
    expect(getByText('All')).toBeInTheDocument();
  });

  test('Desabilitar o botão proximo pokemon se só tiver um', () => {
    const historico = createMemoryHistory();
		const { getByTestId, getAllByTestId } = render(
    <Router history={historico}>
      {<App />}
    </Router>);
    const butTypes = getAllByTestId('pokemon-type-button');
    butTypes.forEach((button) => {
      const atualPok = getByTestId('pokemon-name');
      fireEvent.click(button)
      const proximoPok = getByTestId('pokemon-name');
      const pokemonsType = pokemons.filter((item) => item.type === button.textContent);
      if (pokemonsType.length === 1) expect(atualPok === proximoPok)
    })
  });
});
