import React from 'react';
import { render, cleanup } from '@testing-library/react';
import About from '../components/About';

test('Testando se na pagina About contem infos sobre o pokemon', () => {
  const { getByText, getAllByRole, queryByRole } = render(<About />);
  const h2Text = 'About Pokédex';

  expect(queryByRole('h2')).toBe(h2Text);
  expect(getAllByRole('p').length).toBe(2);

});
