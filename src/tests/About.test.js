import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import About from '../components/About';

function renderWithRouter(ui, routeConfigs = {}) {
  const route = routeConfigs.route || '/';
  const history =
    routeConfigs.history || createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('Testes da página About', () => {
  it('Contém um heading com o texto About Pokédex', () => {
    const { getByText } = renderWithRouter(<About />, { route: '/about' });

    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  it('Contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />, { route: '/about' });

    const p1 = getByText(
      'This application simulates a Pokédex, a digital encliclopedia containing all Pokémons'
    );
    const p2 = getByText(
      'One can filter Pokémons by type, and see more details for each one of them'
    );

    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  it('Contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />, { route: '/about' });

    const image = document.querySelector('.pokedex-image');

    // console.log(image.src);

    const srcImage = image.src;

    expect(srcImage).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'
    );
  });
});
