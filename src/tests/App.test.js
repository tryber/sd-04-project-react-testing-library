import React from 'react';
import { Router } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

// jest.mock('react-router-dom', () => {
//   const moduloOriginal = jest.requireActual('react-router-dom');
//   return {
//     ...moduloOriginal,
//     BrowserRouter: ({ children }) => (<div>{children}</div>),
//   };
// });

function renderWithRouter(ui, routeConfigs = {}) {
  const route = routeConfigs.route || '/';
  const history = routeConfigs.history || createMemoryHistory({ initialEntries: [route] });
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

afterEach(cleanup);

describe('Testando App', () => {
  test('No caminho de URL “/”, a página principal da Pokédex deve ser mostrada.', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokedexText = getByText(/Pokédex/i);
    expect(pokedexText).toBeInTheDocument();
  });
  test('Verificando a existência dos links de navegação na página inicial', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });
  test('Verificando a funcionalidade do botão Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeText = getByText(/Home/i);
    fireEvent.click(homeText);
    expect(history.location.pathname).toBe('/');
  });
  test('Verificando a funcionalidade do botão About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutText = getByText(/About/i);
    expect(history.location.pathname).toBe('/');
    fireEvent.click(aboutText);
    expect(history.location.pathname).toBe('/about');
  });
  test('Verificando a funcionalidade do botão Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutText = getByText(/Favorite Pokémons/i);
    expect(history.location.pathname).toBe('/');
    fireEvent.click(aboutText);
    expect(history.location.pathname).toBe('/favorites');
  });
  test('Entrar em uma URL desconhecida exibe a página Not Found', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/xablau' });
    const notFoundText = getByText(/Page requested not found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
