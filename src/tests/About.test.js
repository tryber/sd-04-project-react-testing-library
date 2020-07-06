import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

afterEach(cleanup);

describe('Testa pagina About', () => {
  test('Verificando h2 (About Pokédex)', () => {});
  const { getByText } = renderWithRouter(<About />);
  fireEvent.click(getByText(/About/i));
  const textAbout = getByText(/About Pokédex/i);
  expect(textAbout).toBeInTheDocument();

  test('Verificando dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    expect(container.querySelectorAll('p').length).toBe(2);
  });

  test('Verificando imagem Pokédex', () => {
    const img = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const { container } = renderWithRouter(<About />);
    expect(container.querySelector('img').src).toBe(img);
  });
});
