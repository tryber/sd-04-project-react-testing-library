import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, cleanup, render } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Tests do App', () => {
  afterEach(cleanup);

  test('renders a reading with the text `Pokédex`', () => {
    const historico = createMemoryHistory();
		const { getByText } = render(
    <Router history={historico}>
      {<App />}
    </Router>);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Navegação de pages', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  test('Vai para "/" quando clica em "Home"', () => {
		const { getByText, history } = renderWithRouter(<App />);
      fireEvent.click(getByText('Home'));
      const caminho = history.location.pathname;
      expect(caminho).toBe('/');
      expect(getByText('Pokédex')).toBeInTheDocument();
  });

  test('Vai para "/favorites" quando clica em "Favorite Pokémons"', () => {
		const { getByText, history } = renderWithRouter(<App />);
      fireEvent.click(getByText('Favorite Pokémons'));
      const caminho = history.location.pathname;
      expect(caminho).toBe('/favorites');
      expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  test('Vai para "/about" quando clica em "About"', () => {
		const { getByText, history } = renderWithRouter(<App />);
      fireEvent.click(getByText('About'));
      const caminho = history.location.pathname;
      expect(caminho).toBe('/about');
      expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  test('Entra em "Not Found"', () => {
		const { getByText, history } = renderWithRouter(<App />);
      fireEvent.click(getByText('About'));
      history.push('/bestpokemon');
      expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
