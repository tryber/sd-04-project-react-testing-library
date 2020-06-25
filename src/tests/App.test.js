import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';


function renderWithRouter(ui, routeConfigs = {}) {
  const route = routeConfigs.route || '/';
  const history = routeConfigs.history || createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('Test App component', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  test('test favorites home', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  test('test about route', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const about = getByText(/about/i);
    expect(about).toBeInTheDocument();
  });
  test('test favorites route', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const favorite = getByText(/found/i);
    expect(favorite).toBeInTheDocument();
  });
  test('test not found page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/page/not-found/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
