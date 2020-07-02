import React from 'react';
import { Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import NotFound from '../components/NotFound';

function renderWithRouter(ui, routeConfigs = {}) {
  const routing = routeConfigs.routing || '/';
  const history = routeConfigs.history || createMemoryHistory({ initialEntries: [routing] });

  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

test('Testando o h2', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  const tagH2 = document.querySelector('h2');
  const errorPhrase = getByText(/Page requested not found/i);
  expect(tagH2).toBeInTheDocument();
  expect(errorPhrase).toBeInTheDocument();
});

test('checking the gif', () => {
  renderWithRouter(<NotFound />);
  const image = document.querySelector('img');
  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
