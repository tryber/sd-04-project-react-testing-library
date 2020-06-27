import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, getByText } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import { About } from '../components';

describe('testando componente about', () => {
  
  test('testando h2', () => {
    const { getByRole, history } = renderWithRouter(<About />);
    const tituloH2 = getByRole('heading', {tagName: /h2/i, name: /About Pokédex/i});
    expect(tituloH2).toBeInTheDocument();
  });
  test('testando p', () => {
    const { container, history } = renderWithRouter(<About />);
    const par = container.getElementsByTagName('p');
    expect(par.length).toBe(2);
  });
  test('testando img', () => {
    const { getByAltText, history } = renderWithRouter(<About />);
    const img = getByAltText(/Pokédex/i);
    expect(img).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  })
})