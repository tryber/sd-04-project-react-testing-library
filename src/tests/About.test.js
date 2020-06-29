import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import About from '../components/About';

afterEach(cleanup);

describe('segundo requesito', () => {
  it('a página deve conter um heading h2 com o texto About Pokédex', () => {
    const { getByText } = render(<About />);
    const title = getByText(/About Pokédex/i);
    expect(title.tagName).toBe('H2');
  });
  it('a página deve conter dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = render(<About />);
    const pTag = container.querySelectorAll('p');
    expect(pTag).toHaveLength(2);
  });
  it('a página deve conter a imagem apropriada de uma Pokédex', () => {
    const { getByRole } = render(<About />);
    const image = getByRole('img');
    expect(image).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
