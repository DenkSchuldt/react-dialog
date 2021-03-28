
# @DenkSchuldt/react-dialog

> A simple and modern dialog implementation for react.

## Installation
```bash
# NPM
$ npm install --save @DenkSchuldt/react-dialog
```
|Version     | Compatibility|
|------------|--------------|
|1.x         | React ˆ16.8+ |

## Basic usage

See DEMO at [@DenkSchuldt/react-dialog](https://dennyschuldt.com/react/react-dialog)

```javascript
import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Dialog } from '@DenkSchuldt/react-dialog';

const App = () => {
  const [ isVisible, setIsVisible ] = useState(true);
  render() {
    return (
      <div>
        {
          isVisible &&
          <Dialog
            title='This is the dialog title'
            onCloseClick={() => setIsVisible(false)}>
            <span>
              This is the dialog body.
            </span>
          </Dialog>
        }
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.body);

```

## Properties

| Name              | Type     | Required           | Description                                           | Default |
|-------------------|----------|--------------------|-------------------------------------------------------|---------|
| width             | Number   |                    | Dialog width                                          |         |
| height            | Number   |                    | Dialog height                                         |         |
| title             | String   |                    | Dialog title                                          |         |
| draggable         | Boolean  |                    | Allows dialog drag                                    | true    |
| className         | String   |                    | Component class to override styles                    |         |
| slideIn           | String   |                    | Initial animation: top, bottom, left, right           |         |
| cancelableOutside | Boolean  |                    | Whether the dialogs closes by clicking outside or not | false   |
| hideCloseButton   | Boolean  |                    | Hides the close button                                | false   |
| onCloseClick      | function | :white_check_mark: | Close button click function                           |         |
| cancelText        | String   |                    | Negative button text                                  | 'CANCEL'|
| onCancelClick     | function |                    | Negative button click function                        |         |
| cancelDisabled    | Boolean  |                    | Negative button disabled prop                         | false   |
| confirmText       | String   |                    | Positive button text                                  | 'OK'    |
| onConfirmClick    | function |                    | Positive button click function                        |         |
| confirmDisabled   | Boolean  |                    | Positive button disabled prop                         | false   |



## License

MIT © [DenkSchuldt](https://github.com/DenkSchuldt)
