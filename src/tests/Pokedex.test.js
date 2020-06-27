import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import data from '../data';
import renderWithRouter from '../helper/renderWithRouter';

// array que contem os nomes de todos os pokémons:
const pokeNames = data.map((ele) => ele.name);

// objeto que contém {type: [..., names]}:
const pokeNamesandTypes = data.reduce((acc, actual) => {
  const { type } = actual;
  if (!acc[type]) acc[type] = [actual.name];
  else acc[type].push(actual.name);
  return acc;
}, {});
afterEach(cleanup);

describe('quinto requisito', () => {
  it('clique no botão leva ao próximo pokémon, no último deve-se voltar para o primeiro', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/Próximo pokémon/i);
    pokeNames.forEach((name) => {
      expect(getByText(`${name}`).firstChild.textContent).toBe(name);
      fireEvent.click(nextButton);
    });
    // verificando se o primeiro elemento da listo foi retornado, aós o último clique:
    expect(getByText(pokeNames[0])).toBeInTheDocument();
  });

  it('a Pokédex deve exibir apenas um pokémon por vez', () => {
    const { getByTestId } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-name')).toBeInTheDocument();
  });

  it('o texto do botão deve ser o nome do tipo', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const buttonsList = getAllByTestId('pokemon-type-button').map(
      (elem) => elem.firstChild.textContent,
    );
    expect(buttonsList).toStrictEqual(Object.keys(pokeNamesandTypes));
  });

  it('a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    const {
      getAllByTestId,
      getByTestId,
      getByText,
      queryByText,
    } = renderWithRouter(<App />);
    const nextButton = getByText(/Próximo pokémon/i);
    const buttonsList = getAllByTestId('pokemon-type-button');
    // PARA CADA BOTÃO DE TIPO EXISTENTE NA TELA:
    buttonsList.forEach((btn) => {
      // salvando o tipo do botão que será clicado:
      const buttonName = btn.firstChild.textContent;
      fireEvent.click(btn);
      // salvando o tipo do pokemon que aparece na tela:
      const pokemonType = getByTestId('pokemonType').firstChild.textContent;
      // SE VERIFICA SE O TIPO RENDERIZADO NA TELA É O MESMO DO BBOTÃO CLICADO ANTERIORMENTE:
      expect(pokemonType).toBe(buttonName);
      fireEvent.click(nextButton);
      // SE, AO CLICAR NO NEXT BUTTON, O POKEMON NÃO FOR O PRIMEIRO POKÉMON DAQUELE TIPO,
      // CONTINUA CLICANDO E VERIFICANDO OS TIPOS:
      const firstPokemon = pokeNamesandTypes[buttonName][0];
      while (!queryByText(firstPokemon)) {
        expect(pokemonType).toBe(buttonName);
        fireEvent.click(nextButton);
      }
    });
  });

  it('a Pokédex deve conter um botão para resetar o filtro e mostrar todos os pokemons', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/Próximo pokémon/i);
    const resetButton = getByText('All');
    expect(resetButton).toBeInTheDocument();
    fireEvent.click(resetButton);
    // a cada clique do nextButton, verificar se o nome de todos os pokemons estão sendo mostrados:
    pokeNames.forEach((name) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
  });
});
