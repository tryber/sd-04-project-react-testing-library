import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { renderWithRouter } from '../Helper/renderWithRouter';
import About from '../components/About';

afterEach(cleanup);

describe('Testes do arquivo About', () => {
  test('Exibir informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />, '/about');
    const text = getByText(/This application simulates a Pokédex/i);
    expect(text).toBeInTheDocument();
  });
  test('Conter um heading h2 com o texto About Pokédex', () => {
    const { getByText, container } = renderWithRouter(<About />);
    const tag = container.querySelector('h2');
    expect(tag).toBeInTheDocument();
    const text = getByText(/About Pokédex/i);
    expect(tag).toBe(text);
  });
  test(' Conter dois <p> com texto sobre a Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const tag = container.querySelectorAll('p');
    expect(tag.length).toBe(2);
  });
  test('Existir uma imagem de uma Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const tag = container.querySelector('img');
    const imageUrl = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(tag.src).toBe(imageUrl);
  });
});