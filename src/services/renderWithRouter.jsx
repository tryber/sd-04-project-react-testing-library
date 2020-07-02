import React from 'react';
import { createMemoryHistory } from 'history';
import Router from 'react-router-dom';
import { render } from '@testing-library/react';


function renderWithRouter(ui, routeConfigs = {}) {
  const routing = routeConfigs.routing || '/';
  const history = routeConfigs.history || createMemoryHistory({ initialEntries: [routing] });

  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

export default renderWithRouter;