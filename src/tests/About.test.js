import React from 'react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('A página "About" deve exibir informações sobre a Pokédex', () => {
  test('A página deve conter um heading h2 com o texto About Pokédex', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/about' });
    const title = getByText('About Pokédex');
    expect(title).toBeInTheDocument();
  });

  // test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
  //   const { getAllByRole } = renderWithRouter(<App />, { route: '/about' });
  // });

  test('A página deve conter a imagem de uma Pokédex', () => {
    const { getByAltText } = renderWithRouter(<App />, { route: '/about' });
    const img = getByAltText('Pokédex');
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
