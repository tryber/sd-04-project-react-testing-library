import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('About', () => {
  test('A página deve conter um heading `h2` com o texto `About Pokédex`;', () => {
    const { getByRole } = render(<About />);
    const h2 = getByRole('heading');
    expect(h2).toBeInTheDocument();
    expect(h2.tagName).toBe('H2');
    expect(h2.textContent).toBe('About Pokédex');
  });

  test('A página deve conter dois parágrafos com texto sobre a Pokédex;', () => {
    const { container } = render(<About />);
    const arrayOfPs = container.getElementsByTagName('p');
    expect(arrayOfPs.length).toBe(2);
  });

  test('A página deve conter a seguinte imagem de uma Pokédex: `https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`.', () => {
    const { getByRole } = render(<About />);
    const img = getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
