import React from 'react';
import renderWithRouter from '../services/renderwithRouter';
import About from '../components/About';
import { render } from 'react-dom';

describe('About page', () => {
  test('should render about component', () => {
    const { getByText } = renderWithRouter(<About />);
    const aboutHeader = getByText(/About Pokédex/i);

    expect(aboutHeader).toBeInTheDocument();
  });
  test('should have a h2 element with "About Pokédex" text', () => {
    renderWithRouter(<About />);
    const headerElement = document.querySelector('h2');

    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent('About Pokédex');
  });
  test('should have two paragraphs', () => {
    renderWithRouter(<About />);
    const paragraphs = document.querySelectorAll('p');

    expect(paragraphs.length).toBe(2);
  });
  test('should have an specific image', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');

    expect(image.getAttribute('src')).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'
    );
  });
});
