# Reactive Textarea 🎉️

A simple javascript module that made HTML textarea elements reacts to input to perform some task. [VIEW EXAMPLES HERE](https://reactive-ta.iamjoberror.com/)

![GitHub package.json version](https://img.shields.io/github/package-json/v/joberror/reactive-textarea?style=for-the-badge) [![GitHub license](https://img.shields.io/github/license/joberror/reactive-textarea?style=for-the-badge)](https://github.com/joberror/reactive-textarea/blob/master/LICENSE)  ![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fjoberror%2Freactive-textarea%2F)

## Features

* Text and word count
* Word filter
* Text limit
* Custom function, etc.

## What's New

* 3 new helpers `noOfWordsFiltered`, `noOfWords`, `inputPercent`.
* Better documentation and improved code.
* Supports module loading option.

## Download

* [Full script with comments - reactive-ta.js](https://github.com/joberror/reactive-textarea/blob/master/public/scripts/reactive-ta.js)
* [minimal version, less kb - reactive-ta-min.js](https://github.com/joberror/reactive-textarea/blob/master/public/scripts/reactive-ta-min.js)

## Example

Load the script through `script tag` or `module` option

```html
<script type="text/javascript" src="./reactive-ta.min.js"></script>

// OR

<script type="module">
    import { reactiveTextArea as reactive} from "./reactive-ta.min.js"
</script>
```

1. __Limit__ and show counted text.

    ```html
    <div>
        <textarea name="reactiveA"></textarea>
        <span>0</span>
    </div>
    ```

    ```javascript
    reactive.set({
        // set limit allowed
        limit: 120,

        // set textarea element
        el: document.getElementsByTag('textarea'),

        // plugin helper
        curCount: document.getElementsByTag('span'),

        //NB: there are 2 other helper namely;
        // `remCount`: displays remaining input value &
        // `totalCount`: displays total input allowed
    });

    reactive.init();
    ```

2. __Filter__ or restrict some words

    ```html
    <div>
        <textarea name="reactiveA"></textarea>
        <span>0</span>
    </div>
    ```

    ```javascript
    reactive.set({
        // set limit allowed
        limit: 100,

        // set textarea element
        el: document.getElementsByTag('textarea'),

        // plugin helper
        remCount: document.getElementsByTag('span'),

        // set list of words to filter with a pipe symbol
        unAllowed: 'fool|mad|hoe|stupid|dumb',

        // Enable strict filtering;
        // eg. filters 'mad' from 'madagascar'.
        // default is false
        strict: true,
    });

    reactive.init();
    ```

3. Explore the limitless through __Custom Function__

    ```html
    <textarea name="reactiveA"></textarea>
    <div>
        <span>0</span>
        <!--- HR element progress in width as the user types -->
        <hr />
    </div>
    ```

    ```css
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
    reactive.set({
        // set limit allowed
        limit: 120,

        // set textarea element
        el: document.getElementsByTag('textarea'),

        // plugin helper
        curCount: document.getElementsByTag('span'),

        // set list of words to filter with a pipe symbol
        unAllowed: 'fool|mad|hoe|stupid|dumb',

        // custom function to call
        customFunc: logAll,
    });

    reactive.init();

    // Custom function

    let progress = document.querySelector('hr');

    function logAll(args) {
        // This function is exposed to the following plugin helpers
        // through the its argument Object;

        // 1. `args.event`: current event name triggered (copy, paste, etc).
        // 2. `args.inputs`: current texts in the textarea. (str)
        // 3. `args.inputPercent`: total texts count in percentage. (num)
        // 4. `args.noOfTexts`: total texts count. (num)
        // 5. `args.noOfWords`: total words count. (num)
        // 6. `args.noOfWordsFiltered`: total filtered words. (num)

        // eg: log no of words typed
        console.log(args.noOfWords);

        // HR width gets altered based on the percentage.
        Object.assign(progress.style, {width: args.inputPercent + "%"})
    }
    ```

## What's Next

* Adds more features
* Adds more example to showcase usefulness

Please kindly follow me on twitter for updates. Thank you!
