import React from 'react';
import About from '../components/About';
import { render, cleanup} from '@testing-library/react';

describe('A página "About" deve exibir informações sobre a Pokédex', () => {
  afterEach(cleanup);

  test('Deve conter um h2 com o texto "About Pokédex"', () => {
    const { getByText } = render(<About />);
    const el = getByText(/About Pokédex/);
    expect(el.tagName).toBe('H2');
    expect(el).toBeInTheDocument();
  });
 
  test('Deve conter dois parágrafos com texto sobre a Pokédex;', () => {
    const { getAllByText } = render(<About />);
    const els = getAllByText(/[/w]*/).filter(el => el.tagName === 'P');
    expect(els.length === 2).toBe(true);
    els.forEach((item) => {
      expect(item.textContent.length > 0).toBe(true)
      expect(item).toBeInTheDocument();
    });
  })

  test('A página deve conter a imagem de uma Pokédex', () => {
    const url = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const { getByAltText } = render(<About />);
    const img = getByAltText('Pokédex');
    expect(img.src).toBe(url);
  })
})
