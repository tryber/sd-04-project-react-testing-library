import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup, fireEvent, getByText } from '@testing-library/react';
import App from '../App';


afterEach(cleanup);


// jest.mock('react-router-dom', () => {
//   const moduloOriginal = jest.requireActual('react-router-dom');
// })

function renderWithRouter(ui, routeConfigs = {}) {
  const route = routeConfigs.route || '/';
  const history = routeConfigs.history || createMemoryHistory({ initialEntries: [route] });
  // if (routeConfigs.pageNotFound) {
  //   history.push(route)
  // }

  return {
    ...render(<Router history={history}> {ui}</Router>),
    history
  }
}

const arrayTest = [{ sequence: 'Primeiro', text: 'Home', url: '/' },
{ sequence: 'Segundo', text: 'About', url: '/about' },
{ sequence: 'Terceiro', text: 'Favorite Pokémons', url: '/favorites' }];

describe('Testando links de navegação', () => {
  arrayTest.forEach(element => {
    const { sequence, url, text } = element;
    test(`${sequence} Link, deve possuir o texto ${text}, URL ${url}`, () => {
      const { getByText, history } = renderWithRouter(<App />);
      const regex = new RegExp(text);
      const page = getByText(regex);
      fireEvent.click((page));
      const { pathname } = history.location;
      expect(pathname).toBe(url);
      expect(page).toBeInTheDocument();
    })
  });

  test('Navegando para uma rota que não existe', () => {
    // const history2 = createMemoryHistory();
    // const route = '/NotFound'
    // history2.push(route);
    const { getByText, history } = renderWithRouter(<App />, { route: '/PageNotFound' });

    const pageNotFound = getByText(/Page requested not found/i);
    expect(pageNotFound).toBeInTheDocument();
  })
})
