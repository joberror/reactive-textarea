# Reactive Textarea 🎉️

A simple javascript module that made HTML textarea elements reacts to input to perform some task

![GitHub package.json version](https://img.shields.io/github/package-json/v/joberror/reactive-textarea?style=for-the-badge) [![GitHub license](https://img.shields.io/github/license/joberror/reactive-textarea?style=for-the-badge)](https://github.com/joberror/reactive-textarea/blob/master/LICENSE)  ![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fjoberror%2Freactive-textarea%2F)

## Features

* Counter
* Filter
* Limiter
* Custom callback
* Helpers

## Highlights

* Callback rich arguments `noOfWordsFiltered`, `noOfWords`, `countInPercent`, etc
* Better documentation and improved code.
* Any features can be turned off or on.
* Supports module loading option.

## Installation

```shell
npm install -D @joberror/reactive-textarea
```

## Example

Load the script through `require` or `import module` option

```js
const reactiveTextArea = require('reactive-textarea')

// OR

import { reactiveTextArea } from "@joberror/reactive-textarea"
```

1. __Limit__ and __Count__ text.

    ```html
    <div>
        <textarea name="reactiveA"></textarea>
        <span></span>
    </div>
    ```

    ```javascript
    reactiveTextArea.set({
        // Enable counting
        counter: true

        // Enable and set limit
        limiter: { on: true, max: 120 }

        // set textarea element
        el: document.getElementsByTag('textarea'),

        // plugin helper
        helpers: { curCountEl: 'span' }

        // NB: there are 2 other counting text/word helpers namely;
        // `remCountEl`: displays remaining input value &
        // `totalCountEl`: displays total input allowed
    });

    reactiveTextArea.init();
    ```

2. __Filter__: restrict some words based on filter list

    ```html
    <div>
        <textarea name="reactiveA"></textarea>
        <span></span>
    </div>
    ```

    ```javascript
    reactiveTextArea.set({
        // set textarea element
        el: document.getElementsByTag('textarea'),

        // plugin helper
        helpers: { filterCountEl: 'span' },

        // set list of words to filter with a pipe symbol
        screener: {
          words: 'fool|mad|hoe|stupid|dumb',
          // Enable strict filtering
          // eg. this will filter 'mad' from madagascar - be careful
          // default is false
          strict: true
        }
    });

    reactiveTextArea.init();
    ```

3. Explore the limitless through __Custom Function__

    ```html
    <!--HTML -->
    <textarea name="reactiveA"></textarea>
    <div>
        <span>0</span>
        <!--- HR element progress in width as the user types -->
        <hr />
    </div>
    ```

    ```css
    /** CSS **/
    div {
        display: flex;
        flex-direction: row;
    }

    div hr {
        display: inline block;
        height: 1px;
        width: 0;
        border: 1px solid #000;
    }
    ```

    ```javascript
    reactiveTextArea.set({
        // set textarea element
        el: document.getElementsByTag('textarea'),

        // Enable and set limit
        limiter: { on: true, max: 150 }

        // Enable counting
        counter: true

        // helper
        helpers: { remCountEL: 'span'}

        // custom function to call
        callbackFunc: logAll,
    });

    reactiveTextArea.init();

    // Custom function

    let progress = document.querySelector('hr');

    function logAll(args) {
        // This function is exposed to the following plugin helpers

        // 1. `args.eventType`: current event name triggered (copy, paste, etc).
        // 2. `args.inputs`: current texts in the textarea. (str)
        // 3. `args.inputPercentage`: total texts count in percentage. (num)
        // 4. `args.noOfTexts`: total texts count. (num)
        // 5. `args.noOfInputWords`: total words count. (num)
        // 6. `args.noOfInputTexts`: total text count. (num)
        // 7. `args.noOfInputFiltered`: total filtered words. (num)

        // eg: log no of words typed
        console.log(args.noOfInputWords);

        // HR width gets altered based on the percentage.
        Object.assign(progress.style, {width: args.inputPercentage + "%"})
    }
    ```

## What's Next

* Adds more features
* Bugs and performance fixes
* Adds more examples.

Please kindly follow me on twitter for updates. Thank you!
