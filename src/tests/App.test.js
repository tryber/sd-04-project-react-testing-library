import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { renderWithRouter } from '../Helper/renderWithRouter';
import App from '../App';

afterEach(cleanup);

const arrayTest = [{ sequence: 'Primeiro', text: 'Home', url: '/' },
{ sequence: 'Segundo', text: 'About', url: '/about' },
{ sequence: 'Terceiro', text: 'Favorite Pokémons', url: '/favorites' }];

describe('Testando links de navegação', () => {
  arrayTest.forEach((element) => {
    const { sequence, url, text } = element;
    test(`${sequence} Link, deve possuir o texto ${text}, URL ${url}`, () => {
      const { getByText, history } = renderWithRouter(<App />);
      const regex = new RegExp(text);
      const page = getByText(regex);
      fireEvent.click((page));
      const { pathname } = history.location;
      expect(pathname).toBe(url);
      expect(page).toBeInTheDocument();
    });
  });

  test('Navegando para uma rota que não existe', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/PageNotFound' });

    const pageNotFound = getByText(/Page requested not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
