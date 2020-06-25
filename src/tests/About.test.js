import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';
import { MemoryRouter } from 'react-router-dom';

test('A página "About" deve exibir informações sobre a Pokédex ', () => {
  const { getByText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const info = getByText('About Pokédex');
  expect(info).toBeInTheDocument();
});

test('A página deve conter um heading h2 com o texto About Pokédex', () => {
  const { getByText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const title = getByText('About Pokédex');
  expect(title).toBeInTheDocument();
});

test('Verificando se existe dois paragrafos', () => {
  const { getByText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const para1 = getByText(/This application simulates/);
  expect(para1).toBeInTheDocument();
  const para2 = getByText(/One can filter Pokémons by type/);
  expect(para2).toBeInTheDocument();
});

test('A página deve conter a imagem de uma Pokédex:', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const img = getByRole('img');
  expect(img).toBeInTheDocument();
  expect(img.src).toMatch(
    'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );
});
