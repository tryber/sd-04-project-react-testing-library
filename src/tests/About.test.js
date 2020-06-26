import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

function renderWithRouter(ui, routeConfigs = {}) {
  const route = routeConfigs.route || '/';
  const history = routeConfigs.history || createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('Tests About.js', () => {
  test('Page About', () => {
    const { getByText } = renderWithRouter(<About />);
    const text = getByText('About Pokédex');
    expect(text).toBeInTheDocument();
  });

  test('h2 with text About Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const text = getByText('About Pokédex');
    const header = document.querySelector('h2')
    expect(header).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(header);
  });

  test('two paragraphs', () => {
    const { getByText } = renderWithRouter(<About />);
    const text1 = getByText('This application simulates a Pokédex, a digital encliclopedia containing all Pokémons');
    const text2 = getByText('One can filter Pokémons by type, and see more details for each one of them');

    expect(text1).toBeInTheDocument();
    expect(text2).toBeInTheDocument();
  });

  test('Image Pokedex ', () => {
    const { getByAltText, getByRole } = renderWithRouter(<About />);
    const alt = getByAltText('Pokédex');
    const img = getByRole('img', { src: 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png' });
    expect(alt).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  })
  
})

