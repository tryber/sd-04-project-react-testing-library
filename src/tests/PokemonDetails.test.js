import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';
import Data from '../data';

describe('Testando About', () => {
  test('Verify if the page just shows the details of the selected pokemon', () => {
    const { getByText } = renderWithRouter(<App pokemon={Data[0]} />, { route: '/pokemons/25' });
    const heading = getByText(/Pikachu Details/i);

    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  test('Apenas pokemon selecionado', () => {
    const { queryByText } = renderWithRouter(<App pokemon={Data[0]} />, { route: '/pokemons/25' });
    const detailsButton = queryByText('More Details');

    expect(detailsButton).toBeNull();
  });

  test('Sumary', () => {
    const { getByText } = renderWithRouter(<App pokemon={Data[0]} />, { route: '/pokemons/25' });
    const headingSummary = getByText('Summary');

    expect(headingSummary).toBeInTheDocument();
    expect(headingSummary.tagName).toBe('H2');
  });

  test('Resumo', () => {
    const { getByText } = renderWithRouter(<App pokemon={Data[0]} />, { route: '/pokemons/25' });
    const { summary } = Data[0];

    expect(getByText(summary)).toBeInTheDocument();
    expect(getByText(summary).tagName).toBe('P');
  });

  test('Localização titulo', () => {
    const { getByText } = renderWithRouter(<App pokemon={Data[0]} />, { route: '/pokemons/25' });

    expect(getByText('Game Locations of Pikachu')).toBeInTheDocument();
    expect(getByText('Game Locations of Pikachu').tagName).toBe('H2');
  });

  test('Todas localizações', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);

    Data.forEach(({ name, foundAt }, index) => {
      for (let i = 0; i < index; i += 1) {
        const nestButton = getByText('Próximo pokémon');
        fireEvent.click(nestButton);
      }

      const moreDetails = getByText('More details');

      fireEvent.click(moreDetails);

      const heading = getByText(`Game Locations of ${name}`);

      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');

      foundAt.forEach(({ location, map }, indice) => {
        const img = getAllByAltText(`${name} location`);
        expect(getByText(location)).toBeInTheDocument();
        expect(img[indice].src).toBe(map);
        expect(img[indice].alt).toBe(`${name} location`);
      });
      fireEvent.click(getByText('Home'));
    });
  });

  test('Varifica imagem', () => {
    const { container, getAllByAltText } = renderWithRouter(<App pokemon={Data[0]} />, { route: '/pokemons/25' });
    const img = container.querySelectorAll('IMG');
    expect(img[0]).toBeInTheDocument();
    expect(img[1]).toBeInTheDocument();
    expect(getAllByAltText('Pikachu location')[0]).toBeInTheDocument();
  });

  test('Verifica checkbox', () => {
    const { getByRole } = renderWithRouter(<App pokemon={Data[0]} />, { route: '/pokemons/25' });
    const checkbox = getByRole('checkbox');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBeFalsy();

    fireEvent.click(checkbox);

    expect(checkbox.checked).toBeTruthy();
    expect(checkbox.parentNode.tagName).toBe('LABEL');
    expect(checkbox.parentNode.innerHTML).toMatch('Pokémon favoritado?');
  });
});
