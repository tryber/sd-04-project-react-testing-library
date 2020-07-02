import React from 'react';
import About from '../components/About';
import renderWithRouter from '../services/renderWithRouter';

test('Testando se na pagina About contem infos sobre o pokemon', () => {
  const { getByText, container, getByRole } = renderWithRouter(<About />);
  const h2Text = getByText('About Pokédex');
  const ptag = container.getElementsByTagName('p');
  const src = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

  expect(h2Text).toBeInTheDocument();
  expect(h2Text.tagName).toBe('H2');
  expect(ptag.length).toBe(2);
  expect(getByRole('img').src).toBe(src);
});
