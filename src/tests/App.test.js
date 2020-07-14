import React from 'react';
import { cleanup, fireEvent, getByRole } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom/extend-expect';

describe('Testing the bagaça of the APP', () => {
  afterEach(cleanup);

  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Should test all links', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[0].innerHTML).toMatch('Home');
    expect(links[0].getAttribute('href')).toBe('/');
    expect(links[1].innerHTML).toMatch('About');
    expect(links[1].getAttribute('href')).toBe('/about');
    expect(links[2].innerHTML).toMatch('Favorite Pokémons');
    expect(links[2].getAttribute('href')).toBe('/favorites');
  });

  it('Should redirect to "/" by landing page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
  });

  it('Should redirect to "/" by clicking Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
  });

  it('Should redirect to "/about" by clicking "About"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const pathName = history.location.pathname;
    expect(pathName).toBe('/about');
  });

  it('Should redirect to "/favorites" by clicking "Favorite Pokémons"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const pathName = history.location.pathname;
    expect(pathName).toBe('/favorites');
  });

  it('Should redirect to "/" by clicking "Favorite Pokémons"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const pathName = history.location.pathname;
    expect(pathName).toBe('/favorites');
  });

  it('Should redirect to not found page when the path does not exist', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/page-that-does-not-exist/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
