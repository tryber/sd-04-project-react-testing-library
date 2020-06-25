import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('A página "About" deve exibir informações sobre a Pokédex', () => {
  test('A página deve conter um heading h2 com o texto About Pokédex', () => {
    const { getByText } = render(<About />);
    const title = getByText('About Pokédex');
    expect(title).toBeInTheDocument();
  });

  test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = render(<About />);
    const allP = container.querySelectorAll('p');
    expect(allP.length).toBe(2);
  });

  test('A página deve conter a imagem de uma Pokédex', () => {
    const { getByAltText } = render(<About />);
    const img = getByAltText('Pokédex');
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
