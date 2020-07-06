import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('About needs contains `About Pokédex', () => {
  const { container, getByText } = render(<About />);
  const header = container('heading');
  const headingTxt = getByText('About Pokédex');
  expect(header).toHaveLength(1);
  expect(headingTxt).toBeInTheDocument();
});

test('About Pokedex page with two paragraphs tags', () => {
  const { container } = render(<About />);
  const paragraph = container('region');
  expect(paragraph).toHaveLength(2);
  expect(paragraph).not.toBeNull();
});

test('About Pokedex page with img tag', () => {
  const { textAbout } = render(<About />);
  const pokedex = textAbout('Pokédex');
  expect(pokedex.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
