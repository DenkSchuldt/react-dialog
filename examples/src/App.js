
import { useState } from 'react';
import Dialog from '@denkschuldt/react-dialog';
import { CodeBlock, github } from "react-code-blocks";

import GithubCorner from './GithubCorner';

import './App.scss';


function App() {
  const [ customDialog, setCustomDialog ] = useState();
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
          <code className='app-installation-code'>
            <div id='dnk-npm'>
              $ npm i @denkschuldt/react-dialog --save
            </div>
            <i
              id='dnk-npm-icon'
              className="fas fa-copy"
              onClick={() => {
                navigator?.clipboard?.writeText('npm i @denkschuldt/react-dialog --save');
                const elem = document.getElementById('dnk-npm');
                const icon = document.getElementById('dnk-npm-icon');
                elem.classList.add('dnk-animate');
                icon.classList.add('dnk-animate');
                elem.addEventListener('animationend', () => {
                  elem.classList.remove('dnk-animate');
                  icon.classList.remove('dnk-animate');
                });
              }}>
            </i>
          </code>
        </article>
        <article>
          <h1>Usage</h1>
          <h2>
            Basic
            {
              example1 ?
              <i
                className="fas fa-minus-circle"
                onClick={() => toggleExample1(false)}>
              </i> :
              <i
                className="fas fa-plus-circle"
                onClick={() => toggleExample1(true)}>
              </i>
            }
          </h2>
          {
            example1 &&
            <>
              <CodeBlock
                text={`
                  import ReactDOM from 'react-dom';
                  import React, { useState } from 'react';
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

                  ReactDOM.render(<App/>, document.getElementById('root'));
                `}
                language={'javascript'}
                showLineNumbers={false}
                theme={github}/>
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
            </>
          }
        </article>
        <article>
          <h2>
            With buttons
            {
              example2 ?
              <i
                className="fas fa-minus-circle"
                onClick={() => toggleExample2(false)}>
              </i> :
              <i
                className="fas fa-plus-circle"
                onClick={() => toggleExample2(true)}>
              </i>
            }
          </h2>
          {
            example2 &&
            <>
              <CodeBlock
                text={`
                  import ReactDOM from 'react-dom';
                  import React, { useState } from 'react';
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

                  ReactDOM.render(<App/>, document.getElementById('root'));
                `}
                language={'javascript'}
                showLineNumbers={false}
                theme={github}/>
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
            </>
          }
        </article>
        <article>
          <h2>
            Overriding styles
            {
              example3 ?
              <i
                className="fas fa-minus-circle"
                onClick={() => toggleExample3(false)}>
              </i> :
              <i
                className="fas fa-plus-circle"
                onClick={() => toggleExample3(true)}>
              </i>
            }
          </h2>
          {
            example3 &&
            <>
              <CodeBlock
              className='hi'
              text={`
                import ReactDOM from 'react-dom';
                import React, { useState } from 'react';
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
                          onConfirmClick={() => {...}}
                          onCloseClick={() => setIsVisible(false)}>
                          <span>
                            You can change the styles by overriding the dialog's classes
                          </span>
                        </Dialog>
                      }
                    </div>
                  );
                }

                ReactDOM.render(<App/>, document.getElementById('root'));

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
              `}
              language={'javascript'}
              showLineNumbers={false}
              theme={github}/>
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
            </>
          }
          <a
            target='_blank'
            rel="noreferrer"
            className='dnk-playground-link'
            href='https://denkschuldt.github.io/react-dialog/storybook'>
            Visit the playground for more examples
            <i className="fas fa-external-link-square-alt"></i>
          </a>
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
                  <td>Whether the dialogs closes by clicking outside or not</td>
                  <td>false</td>
                </tr>
                <tr>
                  <td>closeOnEscPress</td>
                  <td>Boolean</td>
                  <td></td>
                  <td>Whether the dialogs closes by pressing escape</td>
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
