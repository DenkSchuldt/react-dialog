
import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';

import Dialog from './components/Dialog';

afterEach(cleanup);

it('Renders without crashing', () => {
  render(
    <Dialog
      title='This is a dialog'
      onClose={() => {}}
      onConfirm={() => {}}/>
  );
});
