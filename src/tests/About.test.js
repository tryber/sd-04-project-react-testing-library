import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testes do about', () => {
  test('Existe um <h2> com texto "About Pokédex"?', () => {
    const { getByText } = render(<About />);
    const info = getByText('About Pokédex');
    expect(info).toBeInTheDocument();
  });

  test('Existe dois <p> com texto sobre a pokédex"?', () => {
    const { container } = render(<About />);
    const paragrafos = container.querySelectorAll('p');
    expect(paragrafos.length).toBe(2);
  });

  test('Existe uma imagem de uma Pokédex"?', () => {
    const { container } = render(<About />);
    const imgSrc = container.querySelector('img');
    expect(imgSrc.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
