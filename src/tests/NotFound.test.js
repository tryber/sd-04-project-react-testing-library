import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('Page request - not found `/url-aleatoria-inexistente`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/url-aleatoria-inexistente']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Page requested not found')).toBeInTheDocument();
});

test('A página deve exibir a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  const { getByAltText } = render(
    <MemoryRouter initialEntries={['/url-aleatoria-inexistente']}>
      <App />
    </MemoryRouter>,
  );

  const alt = getByAltText(/not found/i);
  expect(alt).toBeInTheDocument();
  expect(alt.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
