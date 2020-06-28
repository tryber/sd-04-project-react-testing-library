import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PokemonDetails } from '../components';
import pokemons from '../data';

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

const match = { params: { id: `${pokemons[0].id}` } };

const onUpdate = jest.fn();

const renderDetails = () => render(<PokemonDetails
  isPokemonFavoriteById={favs}
  match={match}
  pokemons={pokemons}
  onUpdateFavoritePokemons={onUpdate}
/>);

describe('Deve conter mais informações sobre apenas o pokémon selecionado;', () => {
  test('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon', () => {
    const { getByText } = renderDetails();
    expect(getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
  });

  test('O pokémon exibido na página de detalhes não deve conter um link de navegação para exibir detalhes deste pokémon', () => {
    const { queryByText } = renderDetails();
    expect(queryByText('More details')).not.toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { getByText } = renderDetails();
    expect(getByText('Summary')).toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado', () => {
    const { getByText } = renderDetails();
    expect(getByText(pokemons[0].summary)).toBeInTheDocument();
  });
});

describe('A página de detalhes deve exibir uma seção com os mapas com as localizações do pokémon', () => {
  test(`A seção de detalhes deve conter um heading h2 com o texto Game Locations of <name>, 
  onde <name> é o nome do pokémon exibido`, () => {
    const { getByText } = renderDetails();
    expect(getByText(`Game Locations of ${pokemons[0].name}`)).toBeInTheDocument();
  });

  describe('A seção de detalhes deve exibir todas as localizações do pokémon', () => {
    test(`Cada localização deve exibir o nome da localização e uma imagem do mapa da localização, 
    A imagem da localização deve ter um atributo src com a URL da localização,
    A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do pokémon`, () => {
      const { getByText, getAllByAltText } = renderDetails();
      const allImgs = getAllByAltText(`${pokemons[0].name} location`);
      pokemons[0].foundAt.forEach(({ location, map }) => {
        expect(getByText(location)).toBeInTheDocument();
        expect(allImgs.some(({ src }) => src === map)).toBeTruthy();
      });
    });
  });

  describe('A página de detalhes deve permitir favoritar um pokémon', () => {
    test(`A página deve conter um checkbox que permita favoritar um pokémon. Cliques no checkbox devem, 
    alternadadamente, adicionar e remover o pokémon da lista de favoritos,
    O label do checkbox deve ser "Pokémon favoritado?"`, () => {
      const { getByLabelText } = renderDetails();
      const checkbox = getByLabelText('Pokémon favoritado?');
      expect(checkbox).toBeInTheDocument();
      fireEvent.click(checkbox);
      expect(onUpdate).toBeCalled();
    });
  });
});
