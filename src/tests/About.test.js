import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, getByRole } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import About from '../components/About';

describe('Testes do arquivo About.js', () => {
  test('A página deve conter um heading h2 com o texto About Pokédex', () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const h2 = document.querySelector('h2');
    const heading = getByText(/About Pokédex/i);

    expect(h2).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });

  test('A página deve conter dois parágrafos com texto sobre a Pokédex;', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const p = document.querySelectorAll('p');
    expect(p.length).toBe(2);
  });

  test('A página deve conter a seguinte imagem de uma Pokédex:', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const img = document.querySelector('img');
    expect(img.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
