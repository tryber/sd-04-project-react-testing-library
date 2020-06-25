import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Requisito 2', () => {
  afterEach(cleanup);

  test('Informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  test('Contém H2 escrito "About Pokémon"', () => {
    const { getByRole } = renderWithRouter(<About />);
    const title = getByRole('heading');
    expect(title).toHaveTextContent('About Pokédex');
  });
});
