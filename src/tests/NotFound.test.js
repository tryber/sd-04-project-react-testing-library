import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Requirement 4', () => {
  test('text `Page requested not found 😭` in a h2 tag', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/somethingThatDoesntExist');
    const heading = getByText(/page requested not found/i);
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  test('pikachu crying image', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push('/somethingThatDoesntExist');
    const image = getByAltText(/pikachu crying/i);
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
