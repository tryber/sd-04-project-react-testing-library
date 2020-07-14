import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

afterEach(cleanup);

const testPokemon = pokemons.find(({ id }) => id === 25);

describe('Testes do arquivo PokemonDetails.js', () => {
  test('A pagina carrega o pokemon passado', () => {
    const { getByText } = renderWithRouter(<App />, {
      route: `/pokemons/${testPokemon.id}`,
    });
    const header = getByText(`${testPokemon.name} Details`);
    expect(header).toBeInTheDocument();
  });

  test('O pokémon exibido na página de detalhes não deve conter um link de navegação para exibir detalhes deste pokémon;',
    () => {
      const { queryByText } = renderWithRouter(<App />, {
        route: `/pokemons/${testPokemon.id}`,
      });
      const more = queryByText('More details');
      expect(more).not.toBeInTheDocument();
    });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { getByText } = renderWithRouter(<App />, {
      route: `/pokemons/${testPokemon.id}`,
    });
    const heading = getByText('Summary');
    expect(heading).toContainHTML('<h2> Summary </h2>');
  });

  test('A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado;',
    () => {
      const { getByText } = renderWithRouter(<App />, {
        route: `/pokemons/${testPokemon.id}`,
      });
      const paragraph = getByText(testPokemon.summary);
      expect(paragraph).toBeInTheDocument();
    });

  test('A seção de detalhes deve conter um heading h2 com o texto Game Locations of <name>', () => {
    const { getByText } = renderWithRouter(<App />, {
      route: `/pokemons/${testPokemon.id}`,
    });
    const pokemonSummary = getByText(`Game Locations of ${testPokemon.name}`);
    expect(pokemonSummary).toBeInTheDocument();
    expect(pokemonSummary.tagName).toBe('H2');
  });

  test('A seção de detalhes deve exibir todas as localizações do pokémon;', () => {
    const { getByText } = renderWithRouter(<App />, {
      route: `/pokemons/${testPokemon.id}`,
    });
    testPokemon.foundAt.forEach((at) => {
      const location = getByText(at.location);
      expect(location).toBeInTheDocument();
    });
  });

  test('Cada localização deve exibir o nome da localização e uma imagem do mapa da localização', () => {
    const { getAllByAltText } = renderWithRouter(<App />, {
      route: `/pokemons/${testPokemon.id}`,
    });
    testPokemon.foundAt.forEach((at) => {
      expect(getAllByAltText(`${testPokemon.name} location`).some(({ src }) => src === at.map)).toBeTruthy();
    });
  });

  test('A página de detalhes deve permitir favoritar um pokémon', () => {
    const { getByLabelText } = renderWithRouter(<App />, {
      route: `/pokemons/${testPokemon.id}`,
    });
    const favorite = getByLabelText('Pokémon favoritado?');
    expect(favorite).toBeInTheDocument();
    expect(favorite.type).toBe('checkbox');
  });
});
