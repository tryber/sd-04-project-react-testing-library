import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import data from '../data';

describe('sexto requisito', () => {
  it('deve ser retornado um card com as informações corretas de determinado pokémon', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(getByTestId('pokemonType')).toHaveTextContent('Electric');
    expect(getByTestId('pokemon-weight')).toHaveTextContent(
      'Average weight:6.0kg',
    );
    expect(getByAltText('Pikachu sprite')).toBeInTheDocument();
  });

  it('ao clicar em detalhes, URL exibida no navegador deve mudar para /pokemon/<id>', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const { pathname } = history.location;
    expect(pathname).toBe('pokemons/25');
  });

  it('pokémons favoritados devem exibir um ícone de uma estrela', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    // pegando os ID's favoritados no localStorage:
    const favoritesArr = JSON.parse(localStorage.getItem('favoritePokemonIds')) || [];
    // buscando esses ID's no data para passar esse novo arr como props pro componente:
    const dataFiltered = data.filter((pokemon) => favoritesArr.includes(pokemon.id));
    // buscando os nomes de cada pokemon favoritado, para conferir iterar:
    const namesArr = dataFiltered.map((element) => element.name);
    namesArr.forEach((name) => {
      if (getByText(name)) {
        const image = getByAltText(`${name} is marked as favorite`);
        expect(image).toHaveAttribute('src', '/star-icon.svg');
      }
    });
  });
});
