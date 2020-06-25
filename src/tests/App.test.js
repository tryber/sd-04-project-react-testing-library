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
    expect(history.location.pathname).toBe('/');
    const home = getByText(/Home/i);

    expect(home).toBeInTheDocument();
    expect(getByText('Pokédex')).toBeInTheDocument();
  });
  test('test about route', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/About/i));
    expect(history.location.pathname).toBe('/about');
  });
  test('test favorites route', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Favorite Pokémons/i));
    expect(history.location.pathname).toBe('/favorites');

    expect(getByText(/Favorite pokémons/i)).toBeInTheDocument();
  });

  test('test not found page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/page/not-found/');
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
