import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('testando se existe os tres links fixos de navegação', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  const homeLink = getByText(/Home/i);
  const aboutLink = getByText(/About/i);
  const favLink = getByText(/Favorite Pokémons/i);
  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favLink).toBeInTheDocument();
});

test('Testes de navegação juntos pro CC nao encrencar', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const homeLink = getByText(/Home/);
  fireEvent.click(homeLink);
  expect(getByText(/Encountered pokémons/));
  const aboutLink = getByText(/About/);
  fireEvent.click(aboutLink);
  expect(getByText(/About Pokédex/));
  const favLink = getByText(/Favorite Pokémons/);
  fireEvent.click(favLink);
  expect(getByText(/Favorite pokémons/));
});

// test('Teste se, ao clicar em about, redireciona para about page', () => {
//   const { getByText } = render(
//     <MemoryRouter>
//       <App />
//     </MemoryRouter>,
//   );
//   const aboutLink = getByText(/About/);
//   fireEvent.click(aboutLink);
//   expect(getByText(/About Pokédex/));
// });

// test('Teste se, ao clicar em favorite pokemons, redireciona para fav page ', () => {
//   const { getByText } = render(
//     <MemoryRouter>
//       <App />
//     </MemoryRouter>,
//   );
//   const favLink = getByText(/Favorite Pokémons/);
//   fireEvent.click(favLink);
//   expect(getByText(/Favorite pokémons/));
// });
