import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';


describe('Tests of the About.js file', () => {
  test('The "About" page should display information about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />, { route: '/about' });
    const head = getByText(/About Pokédex/i);
    expect(head).toBeInTheDocument();
    expect(head.tagName).toBe('H2');
  });

  test('The page must contain two paragraphs with text about Pokédex', () => {
    const { container } = renderWithRouter(<About />, { route: '/about' });
    const pargs = container.querySelectorAll('P');
    expect(pargs.length).toBe(2);
  });

  test('The page should contain the following image of a Pokédex', () => {
    const { container } = renderWithRouter(<About />, { route: '/about' });
    const img = container.querySelector('IMG');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});

