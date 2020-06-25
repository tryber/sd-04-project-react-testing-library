import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';


test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('At the top of the application, there should be a fixed set of navigation links', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const homeLink = getByText(/Home/i);
  expect(homeLink.getAttribute('href')).toBe('/');

  const aboutLink = getByText(/About/i);
  expect(aboutLink.getAttribute('href')).toBe('/about');

  const favLink = getByText(/Favorite Pokémons/i);
  expect(favLink.getAttribute('href')).toBe('/favorites');
});


test('when the user clicks Home', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const homeLink = getByText(/Home/i);
  fireEvent.click(homeLink);
  const path = history.location.pathname;
  expect(path).toBe('/');
});

test('when the user clicks About', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const aboutLink = getByText(/About/i);
  fireEvent.click(aboutLink);
  const path = history.location.pathname;
  expect(path).toBe('/about');
});

test('when the user clicks Favorite Pokémons', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const favLink = getByText(/Favorite Pokémons/i);
  fireEvent.click(favLink);
  const path = history.location.pathname;
  expect(path).toBe('/favorites');
});

test('Entering an unknown URL displays the Not Found page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/page/unknown/');
  // console.log(history)
  const pageNotFound = getByText(/Page requested not found/i);
  expect(pageNotFound).toBeInTheDocument();
});
