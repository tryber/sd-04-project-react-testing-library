import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FavoritePokemons from '../components/FavoritePokemons';
import data from '../data';

afterEach(cleanup);

describe('terceiro requesito', () => {
  it('sem pokémons favoritos, favorite pokemon found deve aparecer na tela', () => {
    const { getByText } = render(<FavoritePokemons />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
  it('a página só deve exibir deve exibir os cards de pokémons favoritados', () => {
    // pegando os ID's favoritados no localStorage:
    const favoritesArr = JSON.parse(localStorage.getItem('favoritePokemonIds')) || [];
    // buscando esses ID's no data para passar esse novo arr como props pro componente:
    const dataFiltered = data.filter((pokemon) => favoritesArr.includes(pokemon.id));
    // buscando os nomes de cada pokemon favoritado, para conferir depois:
    const namesArr = dataFiltered.map((element) => element.name);
    // passando as props pro componente FavoritePokemons:
    const { queryAllByTestId } = render(<FavoritePokemons pokemons={dataFiltered} />);
    // buscando os nomes de cada pokemon favoritado na tela, com o TestId:
    const names = queryAllByTestId('pokemon-name').map((elem) => elem.firstChild.textContent);
    // comparando se o array de nomes obtido na tela é o mesmo obtido pelo localStorage:
    expect(names).toStrictEqual(namesArr);
  });
});
