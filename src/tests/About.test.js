import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../components/About';

describe('Testing About page', () => {
  afterEach(cleanup);
  it('A página "About" deve exibir informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const heading = getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  it('A página deve conter um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading');
    expect(heading.innerHTML).toMatch('About Pokédex');
  });
  it('A página deve conter dois parágrafos com texto sobre a Pokédex;', () => {
    const { getAllByRole } = renderWithRouter(<About />);
    const paragraphs = getAllByRole('region');
    expect(paragraphs[1].innerHTML).toMatch(
      '<p>This application simulates a Pokédex, a digital encliclopedia containing all Pokémons </p>',
    );
    expect(paragraphs[1].innerHTML).toMatch(
      '<p>One can filter Pokémons by type, and see more details for each one of them</p>',
    );
  });
  it('A página deve conter a seguinte imagem de uma Pokédex:', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    expect(image.getAttribute('src')).toMatch(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
