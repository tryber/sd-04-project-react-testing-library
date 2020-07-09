import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, getByText, fireEvent } from "@testing-library/react";
import App from "../App";

test("renders a reading with the text `Pokédex`", () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test("shows the Pokédex when the route is `/`", () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText("Encountered pokémons")).toBeInTheDocument();
});

describe("testando as rotas", () => {
  afterEach(cleanup);
  test("testar a pag principal", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
    const text = getByText(/Encountered pokemons/);
    expect(text).toBeInTheDocument();
  });

  test('testar a pag Home na rota "/"', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
    const text = getByText(/Encountered pokémons/);
    fireEvent.click(getByText(/home/i));
    expect(text).toBeInTheDocument();
  });

  test('testar a pag About na rota "about"', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/about"]}>
        <App />
      </MemoryRouter>,
    );
    const text = getByText(/About Pokédex/);
    fireEvent.click(getByText(/^About$/));
    expect(text).toBeInTheDocument();
  });

  test('testar a pag Favorite Pokémons em "/favorites/"', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["favorites"]}>
        <App />
      </MemoryRouter>,
    );
    const text = getByText(/Favorite Pokémons/);
    fireEvent.click(getByText(/Favorite Pokémons/));
    expect(text).toBeInTheDocument();
  });

  test('testar pag nao encontrada "/not-foubd"', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/not-found"]}>
        <App />
      </MemoryRouter>,
    );
    const text = getByText(/page requested not found/);
    expect(text).toBeInTheDocument();
  });
});
