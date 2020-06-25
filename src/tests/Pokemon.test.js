import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import data from '../data';
// import Pokemon from '../components/Pokemon';

describe('Testes do requisito 6, Pokemon.js', () => {
  test('Testando o nome', () => {
    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const btn = getByText('Próximo pokémon');
    data.forEach(({ name }) => {
      expect(getByTestId('pokemon-name').textContent).toBe(name);
      fireEvent.click(btn);
    });
  });

  test('Testando o peso', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const btn = getByText('Próximo pokémon');
    data.forEach(({ averageWeight: { value, measurementUnit } }) => {
      expect(
        getByText(`Average weight:${value}${measurementUnit}`),
      ).toBeInTheDocument();
      fireEvent.click(btn);
    });
  });

  test('Testando a src e alt', () => {
    const { getByText, getByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const btn = getByText('Próximo pokémon');
    const image = getByAltText(/Pikachu sprite/i);
    expect(image).toBeInTheDocument();
    expect(image.src).toEqual(
      'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
    fireEvent.click(btn);
  });

  test('Testando o link de navegação', () => {
    const { getByText, getByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const btn = getByText('Próximo pokémon');
    const btnDetails = getByText('More details');
    data.forEach(({ id }) => {
      expect(btnDetails.href).toBe(`http://localhost/pokemons/${id}`);
      fireEvent.click(btn);
    });
  });
});
