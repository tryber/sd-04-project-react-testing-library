import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';
import { MemoryRouter } from 'react-router-dom';

test('A página deve conter um heading h2 com o texto Page requested not found ', () => {
  const { getByText } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  const pageNotFound = getByText(/Page requested not found/i);
  expect(pageNotFound).toBeInTheDocument();
  expect(pageNotFound.tagName).toBe('H2');
});

test('A página deve conter a imagem:', () => {
  const { getByAltText } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  const img = getByAltText('Pikachu crying because the page requested was not found');
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});

