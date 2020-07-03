import React from 'react';
import { render, cleanup } from '@testing-library/react';
import About from '../components/About';

afterEach(cleanup);

describe('Testando About', () => {
  test('A página `About` deve exibir informações sobre a Pokédex', () => {
    const { getByText } = render(<About />);
    const aboutText = getByText(/About Pokédex/i);
    expect(aboutText).toBeInTheDocument();
  });
  test('A página deve conter um heading h2 com o text `About Pokédex`', () => {
    const { getByText } = render(<About />);
    const h2Tag = getByText(/About Pokédex/i);
    expect(h2Tag.tagName).toBe('H2');
  });
  test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = render(<About />);
    const pTag = container.getElementsByTagName('p');
    expect(pTag.length).toBe(2);
  });
  test('A página deve conter uma imagem específica da Pokédex', () => {
    const { getByRole } = render(<About />);
    const imgTag = getByRole('img');
    const source = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imgTag).toHaveAttribute('src', source);
  });
});
