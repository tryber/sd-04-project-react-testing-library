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

describe('Testando componente App', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  test('Testando o Link Home', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Home/i));
    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  test('Testando o Link About', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText(/About/i));
    const about = getByText(/about/i);
    expect(about).toBeInTheDocument();
  });
  test('Testando o Link Favorite Pokémons', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Favorite Pokémons/i));
    const favorites = getByText(/favorite/i);
    expect(favorites).toBeInTheDocument();
  });
});
