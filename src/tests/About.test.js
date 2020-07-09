import React from 'react';
import { render, cleanup } from '@testing-library/react';
import About from '../components/About';

describe('A página "About" deve exibir informações sobre a Pokédex', () => {
  afterEach(cleanup);

  test('A página deve conter um heading `h2` com o texto "About Pokédex"', () => {
    const { getByText } = render(<About />);
    const elem = getByText(/About Pokédex/);
    expect(elem.tagName).toBe('H2');
    expect(elem).toBeInTheDocument();
  });

  test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
    const { getAllByText } = render(<About />);
    const elements = getAllByText(/[/W]*/).filter((comp) => comp.tagName === 'P');
    expect(elements.length === 2).toBe(true);
    elements.forEach((component) => {
      expect(component.textContent.length > 0).toBe(true);
      expect(component).toBeInTheDocument();
    });
  });

  test('A página deve conter a seguinte imagem de uma Pokédex', () => {
    const { getByAltText } = render(<About />);
    const imagem = getByAltText('Pokédex');
    expect(imagem.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
