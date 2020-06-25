import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

it('renders not found title', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/non/existing/page');
  expect(getByText('Page requested not found')).toBeInTheDocument();
});

it('renders not found image', () => {
  const { getByAltText, history } = renderWithRouter(<App />);
  history.push('/non/existing/page');
  expect(getByAltText('Pikachu crying because the page requested was not found')).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
