import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
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

describe('About component tests', () => {
  test('test page content', () => {
    const { getByText, getAllByRole } = renderWithRouter(<About />);

    const aboutText = getByText(/About Pokédex/i);
    expect(aboutText).toBeInTheDocument();
    const paragraf = getAllByRole('region');
    expect(paragraf.length).toBe(2);
  });
  test('test page content', () => {
    const { getByText, getByRole } = renderWithRouter(<About />);

    const h2 = getByRole('heading');
    expect(h2).toBeInTheDocument();
    const h2Content = getByText(h2.innerHTML);
    expect(h2Content).toBeInTheDocument();
  });
  test('test page content', () => {
    const { getByRole } = renderWithRouter(<About />);

    const img = getByRole('img');
    expect(img).toBeInTheDocument();
    const imgSrc = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imgSrc).toBe(img.src);
  });
});
