
import React from 'react';
import { cleanup, render } from '@testing-library/react';

import Dialog from './components/Dialog';

afterEach(cleanup);


test('Renders without crashing', () => {
  const { container, getByText } = render(
    <Dialog
      onClose={() => {}}/>
  );
});

test('Title is show', () => {
  const title = 'This is a dialog';
  const { getByText } = render(
    <Dialog
      title={title}
      onClose={() => {}}/>
  );
  expect(getByText(title)).toBeDefined();
});

test('ClassName is set', () => {
  const className = 'my-test';
  const { container, getByText } = render(
    <Dialog
      onClose={() => {}}
      className={className}/>
  );
  expect(container.querySelector(`.dnk-dialog.${className}`)).toBeDefined();
});

test('Cancel is shown', () => {
  const cancelText = 'CANCEL TEST';
  const { getByText } = render(
    <Dialog
      onClose={() => {}}
      onCancel={() => {}}
      cancelText={cancelText}/>
  );
  expect(getByText(cancelText)).toBeDefined();
});

test('Cancel is clickable', () => {
  const cancelText = 'CANCEL TEST';
  const { getByText } = render(
    <Dialog
      onClose={() => {}}
      onCancel={() => {}}
      cancelText={cancelText}/>
  );
  expect(getByText(cancelText)).not.toHaveProperty('onclick', null);
});

test('Confirm is shown', () => {
  const confirmText = 'CONFIRM TEST';
  const { getByText } = render(
    <Dialog
      onClose={() => {}}
      onConfirm={() => {}}
      confirmText={confirmText}/>
  );
  expect(getByText(confirmText)).toBeDefined();
});

test('Confirm is clickable', () => {
  const confirmText = 'CONFIRM TEST';
  const { getByText } = render(
    <Dialog
      onClose={() => {}}
      onConfirm={() => {}}
      confirmText={confirmText}/>
  );
  expect(getByText(confirmText)).not.toHaveProperty('onclick', null);
});

test('Draggable is enabled', () => {
  const { container } = render(
    <Dialog
      onClose={() => {}}/>
  );
  expect(container.querySelector('.dnk-draggable')).toBeDefined();
});

test('Draggable is disabled', () => {
  const { container } = render(
    <Dialog
      draggable={false}
      onClose={() => {}}/>
  );
  expect(container.querySelector('.dnk-draggable')).toBeNull();
});

test('Is cancelable', () => {
  const { container } = render(
    <Dialog
      onClose={() => {}}/>
  );
  expect(container.querySelector('.dnk-dialog'))
  .not.toHaveProperty('onclick', null);
});

test('Is not cancelable', () => {
  const { container } = render(
    <Dialog
      cancelable={false}
      onClose={() => {}}/>
  );
  expect(container.querySelector('.dnk-dialog'))
  .toHaveProperty('onclick', null);
});

test('Children are added', () => {
  const className = 'dialog-children';
  const { container } = render(
    <Dialog
      onClose={() => {}}>
      <div className={className}>
        test
      </div>
    </Dialog>
  );
  expect(container.querySelector(`.${className}`)).toBeDefined();
});

test('Close is clickable', () => {
  const { container } = render(
    <Dialog
      onClose={() => {}}/>
  );
  expect(container.querySelector(`.dnk-dialog-content-toolbar img`))
  .not.toHaveProperty('onclick', null);
});
