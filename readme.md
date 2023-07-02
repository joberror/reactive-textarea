# Reactive Textarea 🎉️

This plugin provides features such as text and word counting, filtering, and limiting when an input is made in an HTML textarea element.

![GitHub package.json version](https://img.shields.io/github/package-json/v/joberror/reactive-textarea?style=for-the-badge) [![GitHub license](https://img.shields.io/github/license/joberror/reactive-textarea?style=for-the-badge)](https://github.com/joberror/reactive-textarea/blob/master/LICENSE)  ![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fjoberror%2Freactive-textarea%2F)

## Features

* Counter
* Filter
* Limiter
* Custom callback
* HTML class helpers

## Highlights

* Callback rich arguments `noOfWordsFiltered`, `noOfInputsWords`, `inputsPercentage`, etc.
* Better documentation and improved code.
* Feature On / Off.
* Supports module loading option.
* A simple test page

## Installation

```shell
npm install -D @joberror/reactive-textarea
```

## Examples

Load the script through `require` or `import` module option

```js
const reactiveTextArea = require('reactive-textarea')

// OR

import { reactiveTextArea } from "@joberror/reactive-textarea"
```

1. __Limit__ and __Count__ text.

    ```html
    <div>
        <textarea></textarea>
        <!-- Class helpers -->
        <span class="reactiveTextArea_curCount"></span>
        <span class="reactiveTextArea_remCount"></span>
        <span class="reactiveTextArea_maxAllowed"></span>
    </div>
    ```

    ```javascript
    reactiveTextArea.config({
        // Enable counting
        enableCounter: true
        countOrLimitType: "word" // "text" or "word"

        // Enable and set limit
        enableLimiter: true
        maxAllowed: 90

        // set textarea element
        element: document.querySelector('textarea')
    });

    reactiveTextArea.init();
    ```

2. __Filter__: restrict some words based on filter list

    ```html
    <div>
        <textarea></textarea>
        <!-- Class helpers -->
        <span class="reactiveTextArea_filterCount"></span>
    </div>
    ```

    ```javascript
    reactiveTextArea.config({
        // Enable filter
        enableFilter: true,
        wordsToFilter: ["dumb", "shit"],
        enableStrictFiltering: false

        // set textarea element
        element: document.querySelector('textarea')
    });

    reactiveTextArea.init();
    ```

3. Explore the limitless through __Custom Function__

    ```html
    <!--HTML -->
    <textarea></textarea>
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
    reactiveTextArea.config({
        // Enable counting
        enableCounter: true
        countOrLimitType: "text"

        // Enable and set limit
        enableLimiter: true
        maxAllowed: 120

        // Enable filter
        enableFilter: true,
        wordsToFilter: ["mad", "stupid"],
        enableStrictFiltering: true

        // Callback function
        callbackFunc: logAll

        // set textarea element
        element: document.querySelector('textarea')
    });

    reactiveTextArea.init();

    // Custom function

    let progress = document.querySelector('hr');

    function logAll(args) {
        // This function is exposed to the following helpers

        // 1. `args.events`: current event name triggered (copy, paste, etc).
        // 2. `args.inputs`: current texts in the textarea. (str)
        // 3. `args.inputsPercentage`: total texts count in percentage. (num)
        // 4. `args.inputsCount`: total texts count. (num)
        // 5. `args.noOfInputWords`: total words count. (num)
        // 6. `args.noOfInputTexts`: total text count. (num)
        // 7. `args.noOWordsFiltered`: total filtered words. (num)

        // eg: log no of words typed
        console.log(args.noOfInputWords);

        // HR width gets altered based on the percentage.
        Object.assign(progress.style, {width: args.inputsPercentage + "%"})
    }
    ```

## What's Next

* Adds more features
* Bugs and performance fixes

Please kindly follow me on twitter for updates. Thank you!
