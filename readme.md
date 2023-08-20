# Reactive Textarea 🎉️

This plugin provides features such as text and word counting, filtering, and limiting when an input is made in an HTML textarea element.

![GitHub package.json version](https://img.shields.io/github/package-json/v/joberror/reactive-textarea?style=for-the-badge) [![GitHub license](https://img.shields.io/github/license/joberror/reactive-textarea?style=for-the-badge)](https://github.com/joberror/reactive-textarea/blob/master/LICENSE)  ![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fjoberror%2Freactive-textarea%2F)

## What's New

* Added `args.maxAllowed` to callback function args.
* Added `.reset()` feature to reset textarea and callbacks args
* Improved README documentation

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
# NPM
npm install -D @iamjoberror/reactive-textarea

# Yarn
yarn add -D @iamjoberror/reactive-textarea
```

## Examples

Load the script through `import` module option

```js
import { reactiveTextArea } from "@iamjoberror/reactive-textarea"

// Nuxt 3 approach: please follow the link below as an example on how to use it as a plugin
// https://stackoverflow.com/a/74694711/245030
```

1. __Limit__ and __Count__ text.

    ```html
    <div>
        <textarea></textarea>
        <!-- Class helpers -->
        <!-- Current counter class -->
        <span class="reactiveTextArea_curCount"></span>
        <!-- Remainder counter class -->
        <span class="reactiveTextArea_remCount"></span>
        <!-- Maximum allowed texts or words class -->
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
        <!-- No of filtered words count class -->
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
        // 4. `args.inputsCount`: total count. (num)
        // 5. `args.noOfInputWords`: total words count. (num)
        // 6. `args.noOfInputTexts`: total texts count. (num)
        // 7. `args.noOfWordsFiltered`: total filtered words. (num)
        // 8. `args.maxAllowed`: max number of words or text allowed. (num)

        // eg: log no of words typed
        console.log(args.noOfInputWords);

        // HR width gets altered based on the percentage.
        Object.assign(progress.style, {width: args.inputsPercentage + "%"})
    }
    ```

## What's Next

* Adds more features
* Bugs and performance fixes

Please kindly follow me on [twitter](https://twitter.com/iamjoberror) for updates. Thank you!
