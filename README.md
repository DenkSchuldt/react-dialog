
# @DenkSchuldt/react-dialog

> A simple and modern dialog implementation for react.

## Installation
```bash
# NPM
$ npm install --save @DenkSchuldt/react-dialog
```
|Version     | Compatibility|
|------------|--------------|
|1.x         | React 16.8+  |

## Basic usage

See DEMO at [@DenkSchuldt/react-dialog](https://dennyschuldt.com/react-modern-dialog)

```javascript
import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Dialog } from 'react-modern-dialog';

const App = () => {
  const [ isVisible, setIsVisible ] = useState(true);
  render() {
    return (
      <div>
        {
          isVisible &&
          <Dialog
            onClose={() => setIsVisible(false)}>
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

| Name            | Type     | Required           | Description                                           | Default |
|-----------------|----------|--------------------|-------------------------------------------------------|---------|
| title           | String   |                    | The title of the Dialog                               | [Empty] |
| className       | String   |                    | Dialog class                                          | [Empty] |
| cancelable      | Boolean  |                    | Whether the dialogs closes by clicking outside or not | false   |
| onClose    | function | :white_check_mark: | Close button click function                           | [Empty] |
| confirmText    | String   |                    | Positive button text                                  | [Empty] |
| onConfirm | function |                    | Positive button click function                        | [Empty] |
| cancelText    | String   |                    | Negative button text                                  | [Empty] |
| onCancel | function |                    | Negative button click function                        | [Empty] |

## License

MIT © [DenkSchuldt](https://github.com/DenkSchuldt)
