import { render } from '@testing-library/react';
import React from 'react';
import About from '../components/About';
import renderWithRouter from './services/renderWithRouter';

describe('Requisito 2, About.test', () => {
  test('A página "About" deve exibir informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });
  test('A página deve conter um heading h2 com o texto About Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const heading = getByText('About Pokédex');
    expect(heading.tagName).toBe('H2');
  });
  test('A página deve conter dois parágrafos com texto sobre a Pokédex;', () => {
    const { container } = render(<About />);
    const p = container.querySelectorAll('p');
    expect(p.length).toBe(2);
  });
  test('A página deve conter a imagem de uma Pokédex: ', () => {
    const { getByRole } = render(<About />);
    const img = getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
    expect(img.alt).toBe('Pokédex');
  });
});
