import { StrictMode } from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';

import Dialog from './components/Dialog';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

const finishClosing = () => {
  act(() => vi.advanceTimersByTime(90));
};

const drag = (element) => {
  fireEvent.mouseDown(element, { button: 0, clientX: 10, clientY: 20 });
  fireEvent.mouseMove(document, { clientX: 50, clientY: 80 });
  fireEvent.mouseUp(document);
};

test('renders the title and any renderable children', () => {
  render(
    <Dialog title='My dialog' onCloseClick={vi.fn()}>
      Text before <strong>important content</strong> and after
    </Dialog>
  );

  expect(screen.getByText('My dialog').tagName).toBe('HEADER');
  expect(screen.getByText('important content').parentElement.textContent)
    .toBe('Text before important content and after');
});

test('renders without optional title, children, or action buttons', () => {
  const { container } = render(<Dialog onCloseClick={vi.fn()} />);

  expect(container.querySelector('.dnk-dialog-header')).toBeNull();
  expect(container.querySelector('.dnk-dialog-body-buttons')).toBeNull();
  expect(screen.getAllByRole('button')).toHaveLength(1);
  expect(screen.getByRole('button', { name: 'Close dialog' }).type).toBe('button');
});

test('sets all dimension constraints and the custom class', () => {
  const { container } = render(
    <Dialog width={400} height={300} className='custom-dialog' onCloseClick={vi.fn()} />
  );
  const content = container.querySelector('.dnk-dialog-content');

  expect(container.querySelector('.dnk-dialog').classList.contains('custom-dialog')).toBe(true);
  for (const property of ['width', 'minWidth', 'maxWidth']) {
    expect(content.style[property]).toBe('400px');
  }
  for (const property of ['height', 'minHeight', 'maxHeight']) {
    expect(content.style[property]).toBe('300px');
  }
});

test('leaves dimensions to CSS when not supplied', () => {
  const { container } = render(<Dialog onCloseClick={vi.fn()} />);
  const content = container.querySelector('.dnk-dialog-content');

  expect(content.style.width).toBe('');
  expect(content.style.height).toBe('');
});

test.each(['top', 'bottom', 'left', 'right'])('sets the %s slide animation', (slideIn) => {
  const { container } = render(<Dialog slideIn={slideIn} onCloseClick={vi.fn()} />);

  expect(container.querySelector('.dnk-dialog-content-wrapper').style.animationName)
    .toBe(`slide-in-from-${slideIn}`);
});

test('has no slide animation by default', () => {
  const { container } = render(<Dialog onCloseClick={vi.fn()} />);

  expect(container.querySelector('.dnk-dialog-content-wrapper').style.animationName).toBe('');
});

test('preserves default action labels, enabled state, and callback events', () => {
  const onCancelClick = vi.fn();
  const onConfirmClick = vi.fn();
  const onCloseClick = vi.fn();
  render(
    <Dialog onCloseClick={onCloseClick} onCancelClick={onCancelClick} onConfirmClick={onConfirmClick} />
  );
  const cancel = screen.getByRole('button', { name: 'CANCEL' });
  const confirm = screen.getByRole('button', { name: 'OK' });

  expect(cancel.disabled).toBe(false);
  expect(confirm.disabled).toBe(false);
  expect(confirm.classList.contains('dnk-btn-primary')).toBe(true);
  expect(cancel.classList.contains('dnk-btn-primary')).toBe(false);
  fireEvent.click(cancel);
  fireEvent.click(confirm);
  finishClosing();

  expect(onCancelClick).toHaveBeenCalledTimes(1);
  expect(onConfirmClick).toHaveBeenCalledTimes(1);
  expect(onCancelClick.mock.calls[0][0].type).toBe('click');
  expect(onConfirmClick.mock.calls[0][0].type).toBe('click');
  expect(onCloseClick).not.toHaveBeenCalled();
});

test('supports custom action labels and does not call disabled actions', () => {
  const onCancelClick = vi.fn();
  const onConfirmClick = vi.fn();
  render(
    <Dialog
      onCloseClick={vi.fn()}
      onCancelClick={onCancelClick}
      onConfirmClick={onConfirmClick}
      cancelText='Go back'
      confirmText='Continue'
      cancelDisabled
      confirmDisabled
    />
  );
  const cancel = screen.getByRole('button', { name: 'Go back' });
  const confirm = screen.getByRole('button', { name: 'Continue' });

  expect(cancel.disabled).toBe(true);
  expect(confirm.disabled).toBe(true);
  fireEvent.click(cancel);
  fireEvent.click(confirm);
  expect(onCancelClick).not.toHaveBeenCalled();
  expect(onConfirmClick).not.toHaveBeenCalled();
});

test('applies defaults to explicitly undefined props under React 19', () => {
  const onCloseClick = vi.fn();
  const { container } = render(
    <Dialog
      onCloseClick={onCloseClick}
      onCancelClick={vi.fn()}
      onConfirmClick={vi.fn()}
      cancelText={undefined}
      confirmText={undefined}
      cancelDisabled={undefined}
      confirmDisabled={undefined}
      draggable={undefined}
      cancelableOutside={undefined}
    />
  );

  expect(screen.getByRole('button', { name: 'CANCEL' }).disabled).toBe(false);
  expect(screen.getByRole('button', { name: 'OK' }).disabled).toBe(false);
  expect(container.querySelector('.dnk-draggable')).not.toBeNull();
  fireEvent.click(container.querySelector('.dnk-dialog'));
  finishClosing();
  expect(onCloseClick).toHaveBeenCalledOnce();
});

test.each([
  ['onCancelClick', 'CANCEL', 'OK'],
  ['onConfirmClick', 'OK', 'CANCEL']
])('only renders the action supplied through %s', (callback, visibleLabel, missingLabel) => {
  render(<Dialog onCloseClick={vi.fn()} {...{ [callback]: vi.fn() }} />);

  expect(screen.getByRole('button', { name: visibleLabel })).not.toBeNull();
  expect(screen.queryByRole('button', { name: missingLabel })).toBeNull();
});

test('can hide the close button', () => {
  render(<Dialog hideCloseButton onCloseClick={vi.fn()} />);

  expect(screen.queryByRole('button', { name: 'Close dialog' })).toBeNull();
});

test('starts the close animation immediately and calls onCloseClick after 90 ms', () => {
  const onCloseClick = vi.fn();
  const { container } = render(<Dialog onCloseClick={onCloseClick} />);

  fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
  expect(container.querySelector('.dnk-dialog').classList.contains('dnk-dialog-hide-background')).toBe(true);
  expect(onCloseClick).not.toHaveBeenCalled();
  act(() => vi.advanceTimersByTime(89));
  expect(onCloseClick).not.toHaveBeenCalled();
  act(() => vi.advanceTimersByTime(1));
  expect(onCloseClick).toHaveBeenCalledExactlyOnceWith();
});

test('closes on a backdrop click by default', () => {
  const onCloseClick = vi.fn();
  const { container } = render(<Dialog onCloseClick={onCloseClick} />);

  fireEvent.click(container.querySelector('.dnk-dialog'));
  finishClosing();
  expect(onCloseClick).toHaveBeenCalledOnce();
});

test('does not close when the dialog content is clicked', () => {
  const onCloseClick = vi.fn();
  render(<Dialog title='Inside' onCloseClick={onCloseClick}><span>Body</span></Dialog>);

  fireEvent.click(screen.getByText('Inside'));
  fireEvent.click(screen.getByText('Body'));
  finishClosing();
  expect(onCloseClick).not.toHaveBeenCalled();
});

test('disabling outside cancellation keeps the close button usable', () => {
  const onCloseClick = vi.fn();
  const { container } = render(<Dialog cancelableOutside={false} onCloseClick={onCloseClick} />);

  fireEvent.click(container.querySelector('.dnk-dialog'));
  finishClosing();
  expect(onCloseClick).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
  finishClosing();
  expect(onCloseClick).toHaveBeenCalledOnce();
});

test('coalesces repeated button, backdrop, and Escape closes during the animation', () => {
  const onCloseClick = vi.fn();
  const { container } = render(<Dialog closeOnEscPress onCloseClick={onCloseClick} />);
  const closeButton = screen.getByRole('button', { name: 'Close dialog' });

  fireEvent.click(closeButton);
  fireEvent.click(closeButton);
  fireEvent.click(container.querySelector('.dnk-dialog'));
  fireEvent.keyDown(document, { key: 'Escape', repeat: true });
  finishClosing();
  expect(onCloseClick).toHaveBeenCalledOnce();
});

test('allows another close attempt if the owner keeps the dialog mounted', () => {
  const onCloseClick = vi.fn();
  render(<Dialog closeOnEscPress onCloseClick={onCloseClick} />);
  const closeButton = screen.getByRole('button', { name: 'Close dialog' });

  fireEvent.click(closeButton);
  finishClosing();
  expect(onCloseClick).toHaveBeenCalledOnce();
  fireEvent.click(closeButton);
  fireEvent.keyDown(document, { key: 'Escape' });
  finishClosing();
  expect(onCloseClick).toHaveBeenCalledTimes(2);
});

test.each([
  ['modern key', { key: 'Escape' }],
  ['legacy keyCode', { keyCode: 27 }]
])('supports Escape with %s', (_description, event) => {
  const onCloseClick = vi.fn();
  render(<Dialog closeOnEscPress onCloseClick={onCloseClick} />);

  fireEvent.keyDown(document, event);
  expect(onCloseClick).not.toHaveBeenCalled();
  finishClosing();
  expect(onCloseClick).toHaveBeenCalledOnce();
});

test('ignores non-Escape keys', () => {
  const onCloseClick = vi.fn();
  render(<Dialog closeOnEscPress onCloseClick={onCloseClick} />);

  fireEvent.keyDown(document, { key: 'Enter', keyCode: 13 });
  finishClosing();
  expect(onCloseClick).not.toHaveBeenCalled();
});

test('does not close on Escape by default', () => {
  const onCloseClick = vi.fn();
  render(<Dialog onCloseClick={onCloseClick} />);

  fireEvent.keyDown(document, { key: 'Escape', keyCode: 27 });
  finishClosing();
  expect(onCloseClick).not.toHaveBeenCalled();
});

test('starts listening when closeOnEscPress is enabled after mounting', () => {
  const onCloseClick = vi.fn();
  const { rerender } = render(<Dialog onCloseClick={onCloseClick} />);
  rerender(<Dialog closeOnEscPress onCloseClick={onCloseClick} />);

  fireEvent.keyDown(document, { key: 'Escape' });
  finishClosing();
  expect(onCloseClick).toHaveBeenCalledOnce();
});

test('stops listening when closeOnEscPress is disabled after mounting', () => {
  const onCloseClick = vi.fn();
  const { rerender } = render(<Dialog closeOnEscPress onCloseClick={onCloseClick} />);
  rerender(<Dialog closeOnEscPress={false} onCloseClick={onCloseClick} />);

  fireEvent.keyDown(document, { key: 'Escape' });
  finishClosing();
  expect(onCloseClick).not.toHaveBeenCalled();
});

test('uses the latest onCloseClick for Escape after a rerender', () => {
  const originalOnClose = vi.fn();
  const latestOnClose = vi.fn();
  const { rerender } = render(<Dialog closeOnEscPress onCloseClick={originalOnClose} />);
  rerender(<Dialog closeOnEscPress onCloseClick={latestOnClose} />);

  fireEvent.keyDown(document, { key: 'Escape' });
  finishClosing();
  expect(originalOnClose).not.toHaveBeenCalled();
  expect(latestOnClose).toHaveBeenCalledOnce();
});

test('uses the latest callback even if props change during the close animation', () => {
  const originalOnClose = vi.fn();
  const latestOnClose = vi.fn();
  const { rerender } = render(<Dialog onCloseClick={originalOnClose} />);

  fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
  rerender(<Dialog onCloseClick={latestOnClose} />);
  finishClosing();
  expect(originalOnClose).not.toHaveBeenCalled();
  expect(latestOnClose).toHaveBeenCalledOnce();
});

test('cancels a pending close callback when unmounted', () => {
  const onCloseClick = vi.fn();
  const { unmount } = render(<Dialog onCloseClick={onCloseClick} />);

  fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
  unmount();
  finishClosing();
  expect(onCloseClick).not.toHaveBeenCalled();
});

test('a newly mounted dialog can close after the previous one was dismissed', () => {
  const onCloseClick = vi.fn();
  const firstDialog = render(<Dialog onCloseClick={onCloseClick} />);

  fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
  finishClosing();
  firstDialog.unmount();
  const secondDialog = render(<Dialog onCloseClick={onCloseClick} />);
  expect(secondDialog.container.querySelector('.dnk-dialog-hide-background')).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
  finishClosing();
  expect(onCloseClick).toHaveBeenCalledTimes(2);
});

test('removes its Escape listener when unmounted', () => {
  const addListener = vi.spyOn(document, 'addEventListener');
  const removeListener = vi.spyOn(document, 'removeEventListener');
  const onCloseClick = vi.fn();
  const { unmount } = render(<Dialog closeOnEscPress onCloseClick={onCloseClick} />);
  const [, listener] = addListener.mock.calls.find(([type]) => type === 'keydown');

  unmount();
  expect(removeListener).toHaveBeenCalledWith('keydown', listener);
  fireEvent.keyDown(document, { key: 'Escape' });
  finishClosing();
  expect(onCloseClick).not.toHaveBeenCalled();
});

test('closes once under StrictMode and allows the owner to unmount it', () => {
  const onCloseClick = vi.fn(() => unmount());
  const { container, unmount } = render(
    <StrictMode><Dialog closeOnEscPress onCloseClick={onCloseClick} /></StrictMode>
  );

  fireEvent.keyDown(document, { key: 'Escape' });
  fireEvent.keyDown(document, { key: 'Escape', repeat: true });
  finishClosing();
  expect(onCloseClick).toHaveBeenCalledOnce();
  expect(container.innerHTML).toBe('');
});

test('dragging works by default in StrictMode without findDOMNode', () => {
  const { container } = render(
    <StrictMode><Dialog title='Drag me' onCloseClick={vi.fn()} /></StrictMode>
  );
  const wrapper = container.querySelector('.dnk-dialog-content-wrapper');

  expect(container.querySelector('.dnk-draggable')).not.toBeNull();
  drag(screen.getByText('Drag me'));
  expect(wrapper.style.transform).toBe('translate(40px,60px)');
});

test('disabling dragging prevents movement', () => {
  const { container } = render(<Dialog draggable={false} title='Stationary' onCloseClick={vi.fn()} />);

  expect(container.querySelector('.dnk-draggable')).toBeNull();
  drag(screen.getByText('Stationary'));
  expect(container.querySelector('.dnk-dialog-content-wrapper').style.transform).toBe('translate(0px,0px)');
});

test('body content and close button do not initiate dragging', () => {
  const { container } = render(<Dialog onCloseClick={vi.fn()}><span>Body content</span></Dialog>);
  const wrapper = container.querySelector('.dnk-dialog-content-wrapper');

  drag(screen.getByText('Body content'));
  drag(screen.getByRole('button', { name: 'Close dialog' }));
  expect(wrapper.style.transform).toBe('translate(0px,0px)');
});

test('each dialog keeps its own draggable node', () => {
  const { container } = render(
    <>
      <Dialog title='First dialog' onCloseClick={vi.fn()} />
      <Dialog title='Second dialog' onCloseClick={vi.fn()} />
    </>
  );
  const wrappers = container.querySelectorAll('.dnk-dialog-content-wrapper');

  drag(screen.getByText('First dialog'));
  expect(wrappers[0].style.transform).toBe('translate(40px,60px)');
  expect(wrappers[1].style.transform).toBe('translate(0px,0px)');
});
