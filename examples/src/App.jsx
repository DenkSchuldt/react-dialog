import { useState } from 'react';
import Dialog from '@denkschuldt/react-dialog';
import CodeBlock from './CodeBlock.jsx';

import GithubCorner from './GithubCorner.jsx';

import './App.scss';


function App() {
  const [ customDialog, setCustomDialog ] = useState();
  const [ copyStatus, setCopyStatus ] = useState('');
  const [ isDialogVisible, setIsDialogVisible ] = useState(true);
  const [ example1, toggleExample1 ] = useState(true);
  const [ example2, toggleExample2 ] = useState(true);
  const [ example3, toggleExample3 ] = useState(true);
  return (
    <div className="app">
      <header className='app-header'>
        <div className='app-header-content'>
          <h2>@denkschuldt/react-dialog</h2>
          <p>
            A simple to use and customizable react dialog implementation.
          </p>
          <button
            type='button'
            className='app-button'
            onClick={() => setIsDialogVisible(true)}>
            Open dialog
          </button>
        </div>
        {
          isDialogVisible &&
          <Dialog
            cancelableOutside={false}
            className='dnk-my-dialog'
            title='@denkschuldt/react-dialog'
            confirmText='Woohoo!'
            onConfirmClick={() => setIsDialogVisible(false)}
            onCloseClick={() => setIsDialogVisible(false)}>
            <div>
              A simple to use and customizable react dialog implementation.
            </div>
          </Dialog>
        }
      </header>
      <section className='app-body'>
        <article>
          <h1>Installation</h1>
          <div className='app-installation-code'>
            <code>npm install @denkschuldt/react-dialog</code>
            <button
              type='button'
              className='app-icon-button'
              aria-label='Copy installation command'
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText('npm install @denkschuldt/react-dialog');
                  setCopyStatus('Installation command copied.');
                } catch {
                  setCopyStatus('Could not copy. Select and copy the command above.');
                }
              }}>
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'>
                <rect x='8' y='8' width='12' height='12' rx='2' />
                <path d='M16 8V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4' />
              </svg>
            </button>
          </div>
          <p className='app-copy-status' role='status'>{copyStatus}</p>
        </article>
        <article>
          <h1>Props</h1>
          <div className='app-body-table'>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Required</th>
                  <th>Description</th>
                  <th>Default</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>width</td>
                  <td>Number</td>
                  <td></td>
                  <td>Dialog width</td>
                  <td></td>
                </tr>
                <tr>
                  <td>height</td>
                  <td>Number</td>
                  <td></td>
                  <td>Dialog height</td>
                  <td></td>
                </tr>
                <tr>
                  <td>title</td>
                  <td>String</td>
                  <td></td>
                  <td>Dialog title</td>
                  <td></td>
                </tr>
                <tr>
                  <td>draggable</td>
                  <td>Boolean</td>
                  <td></td>
                  <td>Allows dialog drag</td>
                  <td>true</td>
                </tr>
                <tr>
                  <td>className</td>
                  <td>String</td>
                  <td></td>
                  <td>Component class to override styles</td>
                  <td></td>
                </tr>
                <tr>
                  <td>slideIn</td>
                  <td>String</td>
                  <td></td>
                  <td>Initial animation: top, bottom, left, right</td>
                  <td></td>
                </tr>
                <tr>
                  <td>cancelableOutside</td>
                  <td>Boolean</td>
                  <td></td>
                  <td>Whether the dialog closes by clicking outside or not</td>
                  <td>true</td>
                </tr>
                <tr>
                  <td>closeOnEscPress</td>
                  <td>Boolean</td>
                  <td></td>
                  <td>Whether the dialog closes by pressing escape</td>
                  <td>false</td>
                </tr>
                <tr>
                  <td>hideCloseButton</td>
                  <td>Boolean</td>
                  <td></td>
                  <td>Hides the close button</td>
                  <td>false</td>
                </tr>
                <tr>
                  <td>onCloseClick</td>
                  <td>function</td>
                  <td style={{ textAlign: 'center' }}>
                    <p>&#9989;</p>
                  </td>
                  <td>Close button click function</td>
                  <td></td>
                </tr>
                <tr>
                  <td>cancelText</td>
                  <td>String</td>
                  <td></td>
                  <td>Negative button text</td>
                  <td>'CANCEL'</td>
                </tr>
                <tr>
                  <td>onCancelClick</td>
                  <td>function</td>
                  <td></td>
                  <td>Negative button click function</td>
                  <td></td>
                </tr>
                <tr>
                  <td>cancelDisabled</td>
                  <td>Boolean</td>
                  <td></td>
                  <td>Negative button disabled prop</td>
                  <td>false</td>
                </tr>
                <tr>
                  <td>confirmText</td>
                  <td>String</td>
                  <td></td>
                  <td>Positive button text</td>
                  <td>'OK'</td>
                </tr>
                <tr>
                  <td>onConfirmClick</td>
                  <td>function</td>
                  <td></td>
                  <td>Positive button click function</td>
                  <td></td>
                </tr>
                <tr>
                  <td>confirmDisabled</td>
                  <td>Boolean</td>
                  <td></td>
                  <td>Positive button disabled prop</td>
                  <td>false</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
        <article>
          <h1>Usage</h1>
          <h2>
            Basic
            <button
              type='button'
              className='app-icon-button app-toggle-button'
              aria-label={`${example1 ? 'Collapse' : 'Expand'} basic example`}
              aria-expanded={example1}
              aria-controls='example-1'
              onClick={() => toggleExample1(visible => !visible)}>
              <span aria-hidden='true'>{example1 ? '−' : '+'}</span>
            </button>
          </h2>
          {
            example1 &&
            <div id='example-1' className='app-example'>
              <CodeBlock
                text={`
                  import { createRoot } from 'react-dom/client';
                  import { useState } from 'react';
                  import Dialog from '@denkschuldt/react-dialog';

                  const App = () => {
                    const [ isVisible, setIsVisible ] = useState(false);
                    return (
                      <div>
                        <button
                          type='button'
                          onClick={() => setIsVisible(true)}>
                          Show dialog
                        </button>
                        {
                          isVisible &&
                          <Dialog
                            height={150}
                            title='Basic'
                            onCloseClick={() => setIsVisible(false)}>
                            <span>
                              This is the body.
                            </span>
                          </Dialog>
                        }
                      </div>
                    );
                  }

                  createRoot(document.getElementById('root')).render(<App />);
                `}/>
              <footer>
                <button
                  type='button'
                  className='app-button'
                  onClick={() => {
                    setCustomDialog({
                      height: 150,
                      title: 'Basic',
                      onCloseClick: () => setCustomDialog()
                    })
                  }}>
                  Show dialog
                </button>
              </footer>
            </div>
          }
        </article>
        <article>
          <h2>
            With buttons
            <button
              type='button'
              className='app-icon-button app-toggle-button'
              aria-label={`${example2 ? 'Collapse' : 'Expand'} with buttons example`}
              aria-expanded={example2}
              aria-controls='example-2'
              onClick={() => toggleExample2(visible => !visible)}>
              <span aria-hidden='true'>{example2 ? '−' : '+'}</span>
            </button>
          </h2>
          {
            example2 &&
            <div id='example-2' className='app-example'>
              <CodeBlock
                text={`
                  import { createRoot } from 'react-dom/client';
                  import { useState } from 'react';
                  import Dialog from '@denkschuldt/react-dialog';

                  const App = () => {
                    const [ isVisible, setIsVisible ] = useState(false);
                    return (
                      <div>
                        <button
                          type='button'
                          onClick={() => setIsVisible(true)}>
                          Show dialog
                        </button>
                        {
                          isVisible &&
                          <Dialog
                            width={400}
                            title='With buttons'
                            onCancelClick={() => setIsVisible(false)}
                            onConfirmClick={() => setIsVisible(false)}
                            onCloseClick={() => setIsVisible(false)}>
                            <span>
                              This is the body. Now the dialog includes two buttons,
                              one for cancelations, and one for confirmations.
                            </span>
                          </Dialog>
                        }
                      </div>
                    );
                  }

                  createRoot(document.getElementById('root')).render(<App />);
                `}/>
              <footer>
                <button
                  type='button'
                  className='app-button'
                  onClick={() => {
                    setCustomDialog({
                      width: 400,
                      title: 'With buttons',
                      body: 'This is the body. Now the dialog includes two buttons, one for cancelations, and one for confirmations.',
                      onCancelClick: () => setCustomDialog(),
                      onConfirmClick: () => setCustomDialog(),
                      onCloseClick: () => setCustomDialog()
                    })
                  }}>
                  Show dialog
                </button>
              </footer>
            </div>
          }
        </article>
        <article>
          <h2>
            Overriding styles
            <button
              type='button'
              className='app-icon-button app-toggle-button'
              aria-label={`${example3 ? 'Collapse' : 'Expand'} overriding styles example`}
              aria-expanded={example3}
              aria-controls='example-3'
              onClick={() => toggleExample3(visible => !visible)}>
              <span aria-hidden='true'>{example3 ? '−' : '+'}</span>
            </button>
          </h2>
          {
            example3 &&
            <div id='example-3' className='app-example'>
              <CodeBlock
              text={`
                import { createRoot } from 'react-dom/client';
                import { useState } from 'react';
                import Dialog from '@denkschuldt/react-dialog';

                const App = () => {
                  const [ isVisible, setIsVisible ] = useState(false);
                  return (
                    <div>
                      <button
                        type='button'
                        onClick={() => setIsVisible(true)}>
                        Show dialog
                      </button>
                      {
                        isVisible &&
                        <Dialog
                          width={320}
                          title='Overriding styles'
                          className='my-custom-styles'
                          onCancelClick={() => setIsVisible(false)}
                          onConfirmClick={() => setIsVisible(false)}
                          onCloseClick={() => setIsVisible(false)}>
                          <span>
                            You can change the styles by overriding the dialog's classes
                          </span>
                        </Dialog>
                      }
                    </div>
                  );
                }

                createRoot(document.getElementById('root')).render(<App />);

                /*
                  styles.scss
                  .my-custom-styles {
                    .dnk-dialog-content {
                      border-radius: 0;
                      background-color: #fff;
                      .dnk-dialog-close {
                        top: 0;
                        right: 0;
                        border-radius: 0;
                        box-shadow: none;
                        background-color: transparent;
                        &:hover {
                          box-shadow: none;
                        }
                      }
                      .dnk-dialog-body {
                        .dnk-dialog-body-buttons {
                          justify-content: center;
                          button {
                            width: 100%;
                            border-radius: 0;
                          }
                        }
                      }
                    }
                  }
                */
              `}/>
              <footer>
                <button
                  type='button'
                  className='app-button'
                  onClick={() => {
                    setCustomDialog({
                      width: 320,
                      title: 'Overriding styles',
                      className: 'my-custom-styles',
                      body: "You can change the styles by overriding the dialog's classes",
                      onCancelClick: () => setCustomDialog(),
                      onConfirmClick: () => setCustomDialog(),
                      onCloseClick: () => setCustomDialog()
                    })
                  }}>
                  Show dialog
                </button>
              </footer>
            </div>
          }
          <a
            target='_blank'
            rel="noreferrer"
            className='dnk-playground-link'
            href='https://denkschuldt.github.io/react-dialog/storybook'>
            Visit the playground for more examples
            <span className='app-external-icon' aria-hidden='true'>↗</span>
          </a>
        </article>
        <article>
          <h1>License</h1>
          <h2>MIT</h2>
        </article>
      </section>
      <footer className='app-footer'>
        Developed with ❤️ by <a rel="noreferrer" href='https://github.com/DenkSchuldt' target='_blank'>@DenkSchuldt</a>
      </footer>
      {
        customDialog &&
        <Dialog {...customDialog}>
          <span>
            {
              customDialog.body ||
              'This is the body.'
            }
          </span>
        </Dialog>
      }
      <GithubCorner/>
    </div>
  );
}

export default App;
