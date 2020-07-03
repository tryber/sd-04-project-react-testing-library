import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import pokemons from '../data';
import App from '../App';

describe('Testes do arquivo Pokemon.js', () => {
  afterEach(cleanup);

  describe('Deve ser retornado um card com as informações de determinado pokémon', () => {
    test('O nome correto do pokémon deve aparecer na tela', () => {
      const { getByTestId } = render(
        <MemoryRouter initialEntries={['/']}><App /></MemoryRouter>,
      );
      const pokeName = pokemons[0].name;
      const elName = getByTestId('pokemon-name');
      expect(elName.textContent).toBe(pokeName);
    });

    test('O peso médio do pokémon deve ser exibido', () => {
      const { getByTestId } = render(
        <MemoryRouter initialEntries={['/']}><App /></MemoryRouter>,
      );
      const { averageWeight: { value, measurementUnit } } = pokemons[0];

      const pokeWeight = `Average weight:${value}${measurementUnit}`;
      const elWeight = getByTestId('pokemon-weight').textContent;
      expect(pokeWeight).toBe(elWeight);
    });

    test('A imagem deve conter um atributo src com a URL da imagem do pokémon', () => {
      const { getByAltText, getByText } = render(
        <MemoryRouter initialEntries={['/']}><App /></MemoryRouter>,
      );
      const elName = getByText(/Pikachu/).textContent;
      const elImage = getByAltText(`${elName} sprite`);
      const imageURL = pokemons[0].image;
      expect(elImage.src).toBe(imageURL);
    });

    test('Deve existir um link de navegação para exibir detalhes do pokémon', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['/']}><App /></MemoryRouter>,
      );
      const elDetails = getByText(/More details/);
      const pokeId = pokemons[0].id;
      expect(elDetails).toBeInTheDocument();
      expect(elDetails.href.endsWith(`/pokemons/${pokeId}`)).toBe(true);
    });

    test('Verificar redirecionamento para a página de detalhes do pokémon', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['/']}><App /></MemoryRouter>,
      );
      const elDetails = getByText(/More details/);
      expect(getByText(/Encountered pokémons/)).toBeInTheDocument();
      fireEvent.click(elDetails);
      expect(getByText(/Pikachu Details/)).toBeInTheDocument();
    });

    describe('Pokémons favoritados devem exibir um ícone de uma estrela', () => {
      test('O ícone deve ser uma imagem, com o atributo src igual /star-icon.svg', () => {
        const { getByText, getByAltText } = render(
          <MemoryRouter initialEntries={['/pokemons/25']}><App /></MemoryRouter>,
        );
        const elCheckFav = getByText(/Pokémon favoritado?/);
        fireEvent.click(elCheckFav);
        const elImg = getByAltText(/Pikachu is marked as favorite/);
        expect(elImg).toBeInTheDocument();
        expect(elImg.src.endsWith('/star-icon.svg')).toBe(true);
      });
    });

    test('A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite', () => {
      const { getByAltText, getByTestId } = render(
        <MemoryRouter initialEntries={['/pokemons/25']}><App /></MemoryRouter>,
      );
      const elName = getByTestId('pokemon-name').textContent;
      const elImg = getByAltText(`${elName} is marked as favorite`);
      expect(elImg).toBeInTheDocument();
    });
  });
});
