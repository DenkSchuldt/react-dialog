
import React from 'react';
import { cleanup, render } from '@testing-library/react';

import Dialog from './components/Dialog';

afterEach(cleanup);


test('Renders without crashing', () => {
  const { container, getByText } = render(
    <Dialog
      onCloseClick={() => {}}/>
  );
});

test('Title is shown', () => {
  const title = 'This is a dialog';
  const { getByText } = render(
    <Dialog
      title={title}
      onCloseClick={() => {}}/>
  );
  expect(getByText(title)).toBeDefined();
});

test('Width is set', () => {
  const { container } = render(
    <Dialog
      width={100}
      height={200}
      onCloseClick={() => {}}/>
  );
  expect(container.querySelector(`.dnk-dialog-content`))
  .toHaveProperty(['style', 'width'], '100px');
});

test('Height is set', () => {
  const { container } = render(
    <Dialog
      width={100}
      height={200}
      onCloseClick={() => {}}/>
  );
  expect(container.querySelector(`.dnk-dialog-content`))
  .toHaveProperty(['style', 'height'], '200px');
});

test('ClassName is set', () => {
  const className = 'my-test';
  const { container, getByText } = render(
    <Dialog
      className={className}
      onCloseClick={() => {}}/>
  );
  expect(container.querySelector(`.dnk-dialog.${className}`)).toBeDefined();
});

test('Cancel is shown', () => {
  const cancelText = 'CANCEL TEST';
  const { getByText } = render(
    <Dialog
      onCloseClick={() => {}}
      onCancelClick={() => {}}
      cancelText={cancelText}/>
  );
  expect(getByText(cancelText)).toBeDefined();
});

test('Cancel is clickable', () => {
  const cancelText = 'CANCEL TEST';
  const { getByText } = render(
    <Dialog
      onCloseClick={() => {}}
      onCancelClick={() => {}}
      cancelText={cancelText}/>
  );
  expect(getByText(cancelText)).not.toHaveProperty('onclick', null);
});

test('Confirm is shown', () => {
  const confirmText = 'CONFIRM TEST';
  const { getByText } = render(
    <Dialog
      onCloseClick={() => {}}
      onConfirmClick={() => {}}
      confirmText={confirmText}/>
  );
  expect(getByText(confirmText)).toBeDefined();
});

test('Confirm is clickable', () => {
  const confirmText = 'CONFIRM TEST';
  const { getByText } = render(
    <Dialog
      onCloseClick={() => {}}
      onConfirmClick={() => {}}
      confirmText={confirmText}/>
  );
  expect(getByText(confirmText)).not.toHaveProperty('onclick', null);
});

test('Draggable is enabled', () => {
  const { container } = render(
    <Dialog
      onCloseClick={() => {}}/>
  );
  expect(container.querySelector('.dnk-draggable')).toBeDefined();
});

test('Draggable is disabled', () => {
  const { container } = render(
    <Dialog
      draggable={false}
      onCloseClick={() => {}}/>
  );
  expect(container.querySelector('.dnk-draggable')).toBeNull();
});

test('Is cancelable outside', () => {
  const { container } = render(
    <Dialog
      onCloseClick={() => {}}/>
  );
  expect(container.querySelector('.dnk-dialog'))
  .not.toHaveProperty('onclick', null);
});

test('Is not cancelable outside', () => {
  const { container } = render(
    <Dialog
      cancelableOutside={false}
      onCloseClick={() => {}}/>
  );
  expect(container.querySelector('.dnk-dialog'))
  .toHaveProperty('onclick', null);
});

test('Children are added', () => {
  const className = 'dialog-children';
  const { container } = render(
    <Dialog
      onCloseClick={() => {}}>
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
      onCloseClick={() => {}}/>
  );
  expect(container.querySelector(`.dnk-dialog-close`))
  .not.toHaveProperty('onclick', null);
});
