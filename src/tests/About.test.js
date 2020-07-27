import React from 'react';
import renderWithRouter from '../RenderWithRouter';
import About from '../components/About';

describe('Testando About', () => {
  test('Informacoes sobre pokedex', () => {
    const { getByText } = renderWithRouter(<About />);
    const infoAbout = getByText(/encliclopedia/i);

    expect(infoAbout).toBeInTheDocument();
  });

  test('Contem h2 com texto', () => {
    const { getByText } = renderWithRouter(<About />);
    const infoAbout = getByText(/About Pokédex/i);

    expect(infoAbout.tagName).toBe('H2');
  });

  test('Contem 2 Tags H2', () => {
    const { container } = renderWithRouter(<About />);
    const paragrafos = container.querySelectorAll('P');

    expect(paragrafos.length).toBe(2);
  });

  test('Contem Imagem pokedex', () => {
    const { container } = renderWithRouter(<About />);
    const img = container.querySelector('IMG');
    const url = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(img).toBe(img);
    expect(img.src).toBe(url);
  });
});
