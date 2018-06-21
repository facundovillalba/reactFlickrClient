import React from 'react';
import UserSetsView from './src/app/UserSetsView.js';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<UserSetsView />).toJSON();
  expect(rendered).toBeTruthy();
});
