import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('sexto requisito', () => {
  it('deve ser retornado um card com as informações corretas de determinado pokémon', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(getByTestId('pokemonType')).toHaveTextContent('Electric');
    expect(getByTestId('pokemon-weight')).toHaveTextContent(
      'Average weight:6.0kg',
    );
    const pokeImage = getByAltText('Pikachu sprite');
    expect(pokeImage).toBeInTheDocument();
    expect(pokeImage).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('ao clicar em detalhes, URL exibida no navegador deve mudar para /pokemon/<id>', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('pokémons favoritados devem exibir um ícone de uma estrela', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />, {
      route: '/pokemons/25',
    });
    fireEvent.click(getByText(/Pokémon favoritado?/i));
    const image = getByAltText('Pikachu is marked as favorite');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/star-icon.svg');

    // namesArr.forEach((name) => {
    //   if (getByText(name)) {
    //     const image = getByAltText(`${name} is marked as favorite`);
    //     expect(image).toHaveAttribute('src', '/star-icon.svg');
    //     expect(image).toHaveAttribute('src', '/star-icon.svg');
    //   }
    // });
  });
});
