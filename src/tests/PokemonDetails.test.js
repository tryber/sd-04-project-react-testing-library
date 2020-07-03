import React from 'react';
import { MemoryRouter } from 'react-router-dom'
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

describe('Testes do arquivo PokemonDetails.js', () => {
  afterEach(cleanup);

  describe('Deve conter mais informações sobre o pokémon selecionado', () => {
    test('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['/pokemons/25']}><App /></MemoryRouter>,
      );
      expect(getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
    });

    test('Não deve conter link de navegação para exibir detalhes deste pokémon', () => {
      const { queryByText } = render(
        <MemoryRouter initialEntries={['/pokemons/25']}><App /></MemoryRouter>,
      );
      expect(queryByText('More details')).not.toBeInTheDocument();
    });

    test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['/pokemons/25']}><App /></MemoryRouter>,
      );
      expect(getByText('Summary')).toBeInTheDocument();
    });

    test('Deve conter um parágrafo com o resumo do pokémon', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['/pokemons/25']}><App /></MemoryRouter>,
      );
      expect(getByText(pokemons[0].summary)).toBeInTheDocument();
    });
  });

  describe('Deve ser exibido uma seção com os mapas das localizações do pokémon', () => {
    test('Deve haver um heading h2 com o texto Game Locations of <name>', () => {
      const { getByText, getByTestId } = render(
        <MemoryRouter initialEntries={['/pokemons/25']}><App /></MemoryRouter>,
      );
      const elName = getByTestId('pokemon-name').textContent;
      const elH2 = getByText(`Game Locations of ${elName}`);
      expect(elH2).toBeInTheDocument();
    });

    test('A seção de detalhes deve exibir todas as localizações do pokémon', () => {
      const { getByText, getByTestId } = render(
        <MemoryRouter initialEntries={['/pokemons/25']}><App /></MemoryRouter>,
      );
      const elName = getByTestId('pokemon-name').textContent;
      const locations = pokemons.filter(({ name }) => name === elName)[0].foundAt
        .map(({ location }) => location);
      locations.forEach((location) => expect(getByText(location)).toBeInTheDocument()); 
    });

    test('Deve exibir o nome da localização e uma imagem do mapa da localização', () => {
      const { getByTestId, getAllByAltText } = render(
        <MemoryRouter initialEntries={['/pokemons/25']}><App /></MemoryRouter>,
      );
      const elName = getByTestId('pokemon-name').textContent;
      const maps = pokemons.filter(({ name }) => name === elName)[0].foundAt
        .map(({ map }) => map);
      const mapImgs = getAllByAltText('Pikachu location');
      mapImgs.forEach((img) => {
        maps.forEach((map) => {
          if (img.src === map) {
            expect(img.src).toBe(map);
            expect(img).toBeInTheDocument();
          };
        })
      });
    })
  });

  describe('A página de detalhes deve permitir favoritar um pokémon', () => {
    test('A página deve conter um checkbox que permita favoritar um pokémon', () => {
      const { getByText, getByTestId, getByLabelText } = render(
        <MemoryRouter initialEntries={['/pokemons/25']}><App /></MemoryRouter>,
      );
      const favCheck = getByLabelText(/Pokémon favoritado?/);
      expect(favCheck).toBeInTheDocument();
      fireEvent.click(favCheck);
      const elLinkFavPoke = getByText(/Favorite Pokémons/);
      fireEvent.click(elLinkFavPoke);
      const elName = getByTestId('pokemon-name').textContent;
      expect(elName).toBe('Pikachu');
    });
  });
});
