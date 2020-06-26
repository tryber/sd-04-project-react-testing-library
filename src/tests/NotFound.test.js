import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup } from '@testing-library/react';
import NotFound from '../components/NotFound';

afterEach(cleanup);

describe('Testes da página NotFound', () => {
  it('A página deve conter um heading com o texto Page requested not found', () => {
    const history = createMemoryHistory();
    const route = '/rota-inexistente';
    history.push(route);
    const { getByText } = render(
      <Router history={history}>
        <NotFound />
      </Router>,
    );
  
    // console.log(history.location.pathname);
  
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });

  it('A página deve exibir uma imagem (gif)', () => {
    const history = createMemoryHistory();
    const route = '/rota-inexistente';
    history.push(route);
    render(
      <Router history={history}>
        <NotFound />
      </Router>,
    );

    const image = document.querySelector('.not-found-image');

    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});