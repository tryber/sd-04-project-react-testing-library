import React from 'react';
// import { createMemoryHistory } from 'history';
// import { Router } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

// jest.mock('react-router-dom', () => {
//   const originalModule = jest.requireActual('react-router-dom');

//   return {
//     ...originalModule,
//     BrowserRouter: ({ children }) => <div>{children}</div>,
//   };
// });

// function renderWithRouter(
//   ui,
//   {
//     route = '/',
//     history = createMemoryHistory({ initialEntries: [route] }),
//   } = {},
// ) {
//   return {
//     ...render(<Router history={history}>{ui}</Router>),
//     history,
//   };
// }

describe('testing Nav links are presents', () => {
  test('test first link has the text "Home" ', () => {
    const {} = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(document.querySelectorAll('a')[0].getAttribute('href')).toBe('/');
    expect(document.querySelectorAll('a')[1].getAttribute('href')).toBe(
      '/about',
    );
    expect(document.querySelectorAll('a')[2].getAttribute('href')).toBe(
      '/favorites',
    );
  });
});

// describe('testing routes', () => {
//   afterEach(cleanup);

//   test('navigating from home to About', () => {
//     const { getByText } = renderWithRouter(<App />);

//     const heading = getByText(/Pokédex/i);
//     expect(heading).toBeInTheDocument();

//     fireEvent.click(getByText(/about/i));

//     const aboutTitle = getByText(/About Pokédex/);
//     expect(aboutTitle).toBeInTheDocument();
//   });
// });

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
