import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  render, fireEvent, cleanup,
} from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

describe('Testando a pg pokemonDetails', () => {
  afterEach(cleanup);

  test('should ', () => {
    const { getAllByAltText } = render(
      <MemoryRouter initialEntries={['/pokemons/25']}>
        <App />
      </MemoryRouter>,
    );
    const imgs = getAllByAltText('Pikachu location');
    imgs.forEach((img) => expect(img.src).not.toBe(''));
  });
});

  describe('Deve conter mais informações sobre o pokémon selecionado', () => {
    test('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['/pokemons/25']}>
          <App />
        </MemoryRouter>,
      );
      expect(getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
    });

    test('O pokémon exibido na página de detalhes não deve conter um link de navegação para exibir detalhes deste pokémon', () => {
      const { queryByText } = render(
        <MemoryRouter initialEntries={['/pokemons/25']}>
          <App />
        </MemoryRouter>,
      );
      expect(queryByText('More details')).not.toBeInTheDocument();
    });

    test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['/pokemons/25']}>
          <App />
        </MemoryRouter>,
      );
      expect(getByText('Summary')).toBeInTheDocument();
    });

    test('A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['/pokemons/25']}>
          <App />
        </MemoryRouter>,
      );
      expect(getByText(pokemons[0].summary)).toBeInTheDocument();
    });
  });

  describe('A página de detalhes deve exibir uma seção com os mapas com as localizações do pokémon', () => {
    test('A seção de detalhes deve conter um heading `h2` com o texto `Game Locations of <name>`, , onde `<name>` é o nome do pokémon exibido', () => {
      const { getByText, getByTestId } = render(
        <MemoryRouter initialEntries={['/pokemons/25']}>
          <App />
        </MemoryRouter>,
      );
      const name = getByTestId('pokemon-name').textContent;
      const textGamelocationOf = getByText(`Game Locations of ${name}`);
      expect(textGamelocationOf).toBeInTheDocument();
    });

    test('A seção de detalhes deve exibir todas as localizações do pokémon', () => {
      const { getByText, getByTestId } = render(
        <MemoryRouter initialEntries={['/pokemons/25']}>
          <App />
        </MemoryRouter>,
      );
      const nameLocation = getByTestId('pokemon-name').textContent;
      const locations = pokemons.filter(({ name }) => name === nameLocation)[0].foundAt
        .map(({ location }) => location);
      locations.forEach((location) => expect(getByText(location)).toBeInTheDocument());
    });

    test('Deve exibir o nome da localização e uma imagem do mapa da localização', () => {
      const { getByTestId, getAllByAltText } = render(
        <MemoryRouter initialEntries={['/pokemons/25']}>
          <App />
        </MemoryRouter>,
      );
      const nameLocation = getByTestId('pokemon-name').textContent;
      const maps = pokemons.filter(({ name }) => name === nameLocation)[0].foundAt
        .map(({ map }) => map);
      const mapImgs = getAllByAltText('Pikachu location');
      mapImgs.forEach((img) => {
        maps.forEach((map) => {
          if (img.src === map) {
            expect(img.src).toBe(map);
            expect(img).toBeInTheDocument();
          }
        });
      });
    });
  });


  describe('A página de detalhes deve permitir favoritar um pokémon', () => {
    test('O label do checkbox deve ser `Pokémon favoritado?`', () => {
      const { getByText, getByTestId, getByLabelText } = render(
        <MemoryRouter initialEntries={['/pokemons/25']}>
          <App />
        </MemoryRouter>,
      );
      const checkboxPokemon = getByLabelText(/Pokémon favoritado?/);
      expect(checkboxPokemon).toBeInTheDocument();
      fireEvent.click(checkboxPokemon);
      const labelCheckbox = getByText(/Favorite Pokémons/);
      fireEvent.click(labelCheckbox);
      const name = getByTestId('pokemon-name').textContent;
      expect(name).toBe('Pikachu');
    });
  });
