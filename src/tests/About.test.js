import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import About from '../components/About';

function renderWithRouter(ui, routeConfigs = {}) {
  const route = routeConfigs.route || '/';
  const history = routeConfigs.history || createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('Testando a rota', () => {
  test('The `About` page must shows `Pokedex` info', () => {
    const { getByText } = renderWithRouter(<About />);

    fireEvent.click(getByText(/About/i));
    const about = getByText(/About Pokédex/i);
    expect(about).toBeInTheDocument();
  });
});

test('testing the content of image', () => {
  renderWithRouter(<About />);
  const image = document.querySelector('img');
  expect(image.src).toBe(
    'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );
});

/* A página "About" deve exibir informações sobre a Pokédex
A página deve conter um heading h2 com o texto About Pokédex;
A página deve conter dois parágrafos com texto sobre a Pokédex;
A página deve conter a seguinte imagem de uma Pokédex:
https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png. */
