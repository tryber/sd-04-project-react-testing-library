import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

afterEach(cleanup);

describe('Tests on the about page', () => {
  test('Information about pokemons', () => {
    const { getByText } = renderWithRouter(<About />, '/about');
    const info = getByText(/digital encliclopedia containing all Pokémons/i);

    expect(info).toBeInTheDocument();
  });
  test('Should render text for h2', () => {
    const { getByText, container } = renderWithRouter(<About />);

    const h2 = container.querySelector('h2');
    expect(h2).toBeInTheDocument();

    const heading = getByText(/About Pokédex/i);
    expect(h2).toBe(heading);
  });
  test('A page contain two "p" with text about a Pokédex', () => {
    const { container } = renderWithRouter(<About />);

    const paragraph = container.querySelectorAll('p');
    expect(paragraph.length).toBe(2);
  });
  test('A page contain a image', () => {
    const { container } = renderWithRouter(<About />);
    const image = container.querySelector('img');
    const imageUrl = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', imageUrl);
  });
});