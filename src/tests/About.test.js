import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../services/renderWithRouter';


test('Testando se na pagina About contem infos sobre o pokemon', () => {
  const { getByText, getAllByRole, queryByRole, container } = renderWithRouter(<About />);
  const h2Text = 'About Pokédex';
  const ptag = container.getElementsByTagName('p');

  expect(getByText(h2Text)).toBeInTheDocument();
  expect(ptag.length).toBe(2);

});
