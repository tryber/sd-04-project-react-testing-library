import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import { render, fireEvent } from '@testing-library/react';
import About from '../components/About';

describe('Testes do arquivo About.js', () => {
  test('A página "About" deve exibir informações sobre a Pokédex', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <About />
      </Router>,
    );
    history.push('/about');
    const pathname = history.location.pathname;
    expect(pathname).toBe('/about');
  });
  test('A página deve conter um heading h2 com o texto About Pokédex', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={history}>
        <About />
      </Router>,
    );
    const h2 = getByRole('heading');
    expect(h2).toBeInTheDocument();
    expect(h2.innerHTML).toBe('About Pokédex');
  });

  test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <About />
      </Router>,
    );
    const firstParagraph = getByText('This application simulates a Pokédex, a digital encliclopedia containing all Pokémons');
    const secondParagraph = getByText('One can filter Pokémons by type, and see more details for each one of them');
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  test('A página deve conter a seguinte imagem de uma Pokédex', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={history}>
        <About />
      </Router>,
    );
    const img = getByRole('img');
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
