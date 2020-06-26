import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import { render, fireEvent } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testes do arquivo NotFound.js', () => {
  test('A página deve conter um heading h2 com o texto Page requested not found', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={history}>
        <NotFound />
      </Router>,
    );
    const h2 = getByRole('heading');
    expect(h2).toBeInTheDocument();
    expect(h2.textContent).toBe('Page requested not found 😭 ');
  });
  test('A página deve exibir a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const history = createMemoryHistory();
    const { getAllByRole } = render(
      <Router history={history}>
        <NotFound />
      </Router>,
    );
    const img = getAllByRole('img');
    expect(img[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
