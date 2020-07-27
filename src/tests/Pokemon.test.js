import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import pokemons from '../data';
import App from '../App';


describe('Testar a página Pokemon,', () => {
  afterEach(cleanup);

  describe('Deve ser retornado um card com as informações de determinado pokémon', () => {
    test('O nome correto do pokémon deve aparecer na tela', () => {
      const { getByTestId } = render(
        <MemoryRouter initialEntries={['/']}><App /></MemoryRouter>,
      );
      const pokemonName = pokemons[0].name;
      const name = getByTestId('pokemon-name');
      expect(name.textContent).toBe(pokemonName);
    });
    test('O peso médio do pokémon deve ser exibido com um texto no formato `Average weight: <value> <measurementUnit>`, onde `<value>` e `<measurementUnit>` são, respectivamente, o peso médio do pokémon e sua unidade de medida;', () => {
      const { getByTestId } = render(
        <MemoryRouter initialEntries={['/']}><App /></MemoryRouter>,
      );
      const { averageWeight: { value, measurementUnit } } = pokemons[0];
      const pokeWeight = `Average weight:${value}${measurementUnit}`;
      const elWeight = getByTestId('pokemon-weight').textContent;
      expect(pokeWeight).toBe(elWeight);
    });
    test('A imagem deve conter um atributo `src` com a URL da imagem do pokémon. A imagem deverá ter também um atributo `alt` com o texto `<name> sprite`, onde `<name>` é o nome do pokémon', () => {
      const { getByAltText, getByText } = render(
        <MemoryRouter initialEntries={['/']}><App /></MemoryRouter>,
      );
      const name = getByText(/Pikachu/).textContent;
      const img = getByAltText(`${name} sprite`);
      const imageURL = pokemons[0].image;
      expect(img.src).toBe(imageURL);
    });
    test('O pokémon exibido na Pokédex deve conter um link de navegação para exibir detalhes deste pokémon. O link deve possuir a URL `/pokemons/<id>`, onde `<id>` é o id do pokémon exibido', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['/']}><App /></MemoryRouter>,
      );
      const elDetails = getByText(/More details/);
      const pokeId = pokemons[0].id;
      expect(elDetails).toBeInTheDocument();
      expect(elDetails.href.endsWith(`/pokemons/${pokeId}`)).toBe(true);
    });
    test('Ao clicar no link de navegação do pokémon, a aplicação deve ser redirecionada para a página de detalhes de pokémon. A URL exibida no navegador deve mudar para `/pokemon/<id>`, onde `<id>` é o id do pokémon cujos detalhes se deseja ver', () => {
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
        const img = getByAltText(/Pikachu is marked as favorite/);
        expect(img).toBeInTheDocument();
        expect(img.src.endsWith('/star-icon.svg')).toBe(true);
      });
    });
    test('A imagem deve ter o atributo `alt` igual a `<pokemon> is marked as favorite`, onde `<pokemon>` é o nome do pokémon cujos detalhes estão sendo exibidos', () => {
      const { getByAltText, getByTestId } = render(
        <MemoryRouter initialEntries={['/pokemons/25']}><App /></MemoryRouter>,
      );
      const name = getByTestId('pokemon-name').textContent;
      const img = getByAltText(`${name} is marked as favorite`);
      expect(img).toBeInTheDocument();
    });
  });
});
