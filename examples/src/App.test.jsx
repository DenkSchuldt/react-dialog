import { StrictMode } from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from './App.jsx';

afterEach(() => {
  vi.restoreAllMocks();
});

function renderApp() {
  return render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

function exampleButton(title) {
  const example = screen.getByRole('heading', { name: new RegExp(`^${title}`) }).closest('article');
  return within(example).getByRole('button', { name: 'Show dialog' });
}

async function dismissWelcome(user) {
  await user.click(screen.getByRole('button', { name: 'Woohoo!' }));
}

describe('dialog examples', () => {
  it('renders highlighted React examples without obsolete mounting APIs', () => {
    const { container } = renderApp();
    const examples = container.querySelectorAll('.app-code-block code');

    expect(examples).toHaveLength(3);
    for (const example of examples) {
      expect(example.textContent).toMatch(/^import \{ createRoot \}/);
      expect(example.textContent).toContain("from 'react-dom/client'");
      expect(example.textContent).not.toContain('ReactDOM.render');
      expect(example.querySelector('span.token')).toBeInTheDocument();
    }
  });

  it('closes, reopens, and confirms the welcome dialog in Strict Mode', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('button', { name: 'Close dialog' }));
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: 'Woohoo!' })).not.toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: 'Open dialog' }));
    expect(screen.getByRole('button', { name: 'Woohoo!' })).toBeInTheDocument();

    await dismissWelcome(user);
    expect(screen.queryByRole('button', { name: 'Close dialog' })).not.toBeInTheDocument();
  });

  it('opens and closes the basic dialog repeatedly', async () => {
    const user = userEvent.setup();
    renderApp();
    await dismissWelcome(user);

    for (let attempt = 0; attempt < 2; attempt += 1) {
      await user.click(exampleButton('Basic'));
      expect(screen.getByText('This is the body.', { selector: '.dnk-dialog-body > span' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'CANCEL' })).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Close dialog' }));
      await waitFor(() => {
        expect(screen.queryByText('This is the body.', { selector: '.dnk-dialog-body > span' })).not.toBeInTheDocument();
      });
    }
  });

  it.each(['CANCEL', 'OK'])('dismisses and reopens the buttons example after %s', async (action) => {
    const user = userEvent.setup();
    renderApp();
    await dismissWelcome(user);

    await user.click(exampleButton('With buttons'));
    await user.click(screen.getByRole('button', { name: action }));
    expect(screen.queryByRole('button', { name: 'Close dialog' })).not.toBeInTheDocument();

    await user.click(exampleButton('With buttons'));
    expect(screen.getByRole('button', { name: 'CANCEL' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
  });

  it.each(['CANCEL', 'OK'])('dismisses the styled example with %s', async (action) => {
    const user = userEvent.setup();
    renderApp();
    await dismissWelcome(user);

    await user.click(exampleButton('Overriding styles'));
    expect(screen.getByText("You can change the styles by overriding the dialog's classes", { selector: ".dnk-dialog-body > span" })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: action }));
    expect(screen.queryByRole('button', { name: 'Close dialog' })).not.toBeInTheDocument();
  });

  it('collapses and expands a code example with an accessible button', async () => {
    const user = userEvent.setup();
    renderApp();
    await dismissWelcome(user);

    await user.click(screen.getByRole('button', { name: 'Collapse basic example' }));
    const expandButton = screen.getByRole('button', { name: 'Expand basic example' });
    expect(expandButton).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getAllByRole('button', { name: 'Show dialog' })).toHaveLength(2);

    await user.click(expandButton);
    expect(screen.getByRole('button', { name: 'Collapse basic example' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getAllByRole('button', { name: 'Show dialog' })).toHaveLength(3);
  });

  it('copies the installation command and confirms success', async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, 'writeText');
    renderApp();
    await dismissWelcome(user);

    await user.click(screen.getByRole('button', { name: 'Copy installation command' }));
    expect(writeText).toHaveBeenCalledWith('npm install @denkschuldt/react-dialog');
    expect(screen.getByRole('status')).toHaveTextContent('Installation command copied.');
  });

  it('provides a fallback when the clipboard is unavailable', async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValueOnce(new Error('Clipboard denied'));
    renderApp();
    await dismissWelcome(user);

    await user.click(screen.getByRole('button', { name: 'Copy installation command' }));
    expect(screen.getByRole('status')).toHaveTextContent('Could not copy. Select and copy the command above.');
  });
});
