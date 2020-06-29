import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import data from '../data';

describe('sexto requisito', () => {
  it('deve ser retornado um card com as informações corretas de determinado pokémon', () => {
    const { getByTestId, getByAltText, getByText } = renderWithRouter(<App />);
    data.forEach(
      ({
        name,
        type,
        averageWeight: { value, measurementUnit },
        image,
      }) => {
        expect(getByTestId('pokemon-name')).toHaveTextContent(name);
        expect(getByTestId('pokemonType')).toHaveTextContent(type);
        expect(getByTestId('pokemon-weight')).toHaveTextContent(
          `Average weight:${value}${measurementUnit}`,
        );
        const pokeImage = getByAltText(`${name} sprite`);
        expect(pokeImage).toBeInTheDocument();
        expect(pokeImage).toHaveAttribute('src', `${image}`);
        fireEvent.click(getByText(/Próximo pokémon/i));
      },
    );
  });

  it('ao clicar em detalhes, URL exibida no navegador deve mudar para /pokemon/<id>', () => {
    data.forEach(({ id }, index) => {
      const { getByText, history } = renderWithRouter(<App />);
      for (let k = 0; k < index; k += 1) {
        fireEvent.click(getByText(/Próximo pokémon/i));
      }
      fireEvent.click(getByText(/More details/i));
      const { pathname } = history.location;
      expect(pathname).toBe(`/pokemons/${id}`);
    });
  });

  it('pokémons favoritados devem exibir um ícone de uma estrela', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />, {
      route: '/pokemons/25',
    });
    fireEvent.click(getByText(/Pokémon favoritado?/i));
    const image = getByAltText('Pikachu is marked as favorite');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/star-icon.svg');
  });
});
