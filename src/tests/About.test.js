import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, getByTestId } from '@testing-library/react';
import { About } from '../components';

describe('Tests on About.js file', () => {
  test('The "About" page should display information about a Pokédex', () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  test('The page must contain an heading h2 with the text About Pokédex;', () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const h2 = getByText('About Pokédex');
    expect(h2.tagName).toBe('H2');
  });

  test('The page must contain two paragraphs with text about Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const p = document.querySelectorAll('p');
    expect(p.length).toBe(2);
  });

  test('The page must contain the image of a Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const img = document.querySelector('img');
    expect(img.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    )
  });
});
