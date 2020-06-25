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
  test('Redirecionando para Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(getByText('Home')).toBeInTheDocument();
    fireEvent.click(getByText('Home'));
    expect(history.location.pathname).toBe('/');
  });
  test('Redirecionando para About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(getByText('About')).toBeInTheDocument();
    fireEvent.click(getByText('About'));
    expect(history.location.pathname).toBe('/about');
  });
  test('Redirecionando para Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
    fireEvent.click(getByText('Favorite Pokémons'));
    expect(history.location.pathname).toBe('/favorites');
  });
});
