import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('requisito 4', () => {
  test('A página deve conter um heading h2 com o texto Page requested not found 😭', () => {
    const { getByText } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const h2 = document.querySelector('h2');
    const heading = getByText('Page requested not found');

    expect(heading).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
  });
});
