import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './services/renderWithRouter';

describe('Requisito 1', () => {
  test('Links estão presentes', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });
  test('Render Router Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(getByText('Home')).toBeInTheDocument();
    fireEvent.click(getByText('Home'));
    expect(history.location.pathname).toBe('/');
  });
  test('Render Router About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(getByText('About')).toBeInTheDocument();
    fireEvent.click(getByText('About'));
    expect(history.location.pathname).toBe('/about');
  });
});
