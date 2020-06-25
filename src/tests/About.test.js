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

  // test('Possui dois parágrafos sobre Pokédex', () => {
  //   const { getAllByRole } = render(<About />);
  //   const paragraph = getAllByRole('p');
  //   expect(paragraph).toBe(2);
  // });

  test('Contém uma Imagem"', () => {
    const { getByRole } = render(<About />);
    const image = getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
