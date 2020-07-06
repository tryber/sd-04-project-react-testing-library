import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('2. Testes do arquivo About.js', () => {
  test('`About Pokedex` existe', () => {
    const { getByText } = render(<About />);
    const titulo = getByText('About Pokédex');
    expect(titulo).toBeInTheDocument();
    expect(titulo.tagName).toBe('H2');
  });
  test('Se existe dois paragrafos', () => {
    render(<About />);
    const paragrafos = document.querySelectorAll('p');
    expect(paragrafos.length).toEqual(2);
  });
  test('Pokédex image', () => {
    const { getByAltText } = render(<About />);
    const img = getByAltText('Pokédex');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
})
