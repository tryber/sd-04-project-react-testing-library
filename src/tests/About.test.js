import React from 'react';
import { render, cleanup } from '@testing-library/react';
import About from '../components/About';

afterEach(cleanup);

test('Veirificando texto About Pokedéx', () => {
  const { getByText } = render(<About />);
  const textoHeader = getByText('About Pokédex');
  expect(textoHeader).toBeInTheDocument();
});

test('Verificando se existem paragrafos', () => {
  render(<About />);
  const paragrafos = document.querySelectorAll('p');
  expect(paragrafos.length).toBe(2);
});

test('Verificando imagem', () => {
  const { getByAltText } = render(<About />);
  const img = getByAltText('Pokédex');
  expect(img).toBeInTheDocument();
  expect(img.src).toBe(
    'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'
  );
});
