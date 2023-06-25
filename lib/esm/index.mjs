/**
 * A textarea element plugin to count, limit and trigger a function
 * @interface
 */
export let reactiveTextArea = (function () {
    /**
     * All parameters that can be set
     * @namespace
     */
    let defaults = {
        /**
         * Textarea element to target
         * @type {HTMLTextAreaElement}
         * @example document.querySelector('textarea')
         */
        el: "",
        /**
         * What to count and/or limit
         * @type {string}
         * @example "text" | "word"
         */
        countOrLimitType: "text",
        /**
         * Text or word counter
         * Enable | Disable; set to true to enable
         * @type {boolean}
         */
        counter: true,
        /**
         * Enable limiting of texts or words
         */
        limiter: {
            /**
             * Enable | Disable; set to true to enable
             * @type {boolean}
             */
            on: false,
            /**
             * Number of texts/words allowed
             * @type {number}
             */
            max: 150,
        },
        /**
         * Enable word filtering as user type
         */
        screener: {
            /**
             * Filter list; words not allowed
             * @type {string | null}
             * @example "mad|fool|sad|shit|bum"
             */
            words: "",
            /**
             * Enable strictness on word filtering; filters eg, "mad" away from "madagascar"
             * @type {boolean}
             */
            strict: false,
        },
        /**
         * An optional function to call with lots of computed helpers
         * @type {Object}
         */
        callbackFunc: null,
        helpers: {
            /**
             * Helper element to display total texts/words allowed
             * @type {HTMLElement}
             * @example span.total-allowed
             */
            totalCountEl: "",
            /**
             * Helper element to display total current of texts/words typed
             * @type {HTMLElement}
             * @example span.total-current
             */
            curCountEl: "",
            /**
             * Helper element to display remaining texts/words allowed
             * @type {HTMLElement}
             * @example span.remainder
             */
            remCountEl: "",
            /**
             * Helper element to display filtered words count
             * @type {HTMLElement}
             * @example span.filter-count
             */
            filterCountEl: "",
        },
        rules: function (e) {
            return Object.assign(defaults, e);
        },
    }, 
    // Initialize word filter counter
    wordFilterCounter = 0, 
    // initialize object to update all helper elements and callback features
    totalAllowedEl = defaults.helpers?.totalCountEl
        ? document.querySelector(defaults.helpers.totalCountEl)
        : null, currentEl = defaults.helpers?.curCountEl
        ? document.querySelector(defaults.helpers.curCountEl)
        : null, remainderEl = defaults.helpers?.remCountEl
        ? document.querySelector(defaults.helpers.remCountEl)
        : null, filterCountEl = defaults.helpers?.filterCountEl
        ? document.querySelector(defaults.helpers.filterCountEl)
        : null, updater = (el, val) => {
        if (el) {
            el.textContent = val.toString();
        }
    }, 
    // initialize object to call a custom function
    caller = {
        customFn: function (callback, args) {
            if (typeof callback == "function") {
                callback(args);
            }
        },
    }, 
    // Initialize and process all features
    main = {
        // Initiate regular expression for word filter
        filterRegExp: / /,
        init: function () {
            let filters = defaults.screener.words;
            let mainEl = defaults.el;
            let nsf = "(?:(^|[^a-z]))(([^a-z]*)(?=" +
                filters +
                ")" +
                filters +
                ")(?![a-z])";
            // Register strict filter regular expression
            main.filterRegExp =
                filters && defaults.screener.strict
                    ? new RegExp(nsf, "gi")
                    : filters
                        ? new RegExp(filters, "gi")
                        : main.filterRegExp;
            // Instantly update limit count helper element
            updater(totalAllowedEl, defaults.limiter.max);
            // Processes
            // Check for textarea tag and if counter or limiter is on to avoid unnecessary processing or iteration.
            if (mainEl.tagName === "TEXTAREA" &&
                (defaults.counter || defaults.limiter.on)) {
                // Add event listeners
                ["input", "cut", "keyup", "paste", "blur"].forEach(function (e) {
                    return mainEl.addEventListener(e, function (ev) {
                        // Let's process
                        main.process(mainEl, ev);
                    });
                });
            }
        },
        truncateString: function (inputString, limit) {
            if (defaults.countOrLimitType === "text") {
                return inputString.slice(0, limit);
            }
            else {
                var stringArray = inputString.split(" ");
                var truncatedArray = stringArray.slice(0, limit);
                return truncatedArray.join(" ");
            }
        },
        process: function (el, events) {
            // Truncate textarea value to the limit set
            el.value = main.truncateString(el.value, defaults.limiter.max);
            // Store length of incoming variables from textarea (text)
            // This is needed for filtering
            var oldElValueLength = el.value.length;
            // Filtering
            // Check if filter variable is set
            if (defaults.screener.words) {
                // Listen to keypad event
                if (events.key === " " || events.type === "blur") {
                    // filter
                    if (main.filterRegExp.test("a"))
                        el.value = el.value.replace(main.filterRegExp, "");
                }
            }
            // Set new value after filtering and limiting
            var newElValue = el.value;
            // Counter type helper
            var textCount = newElValue.length, wordCount = newElValue.split(" ").filter(function (word) {
                return word !== "";
            }).length, setTypeCount = (defaults.countOrLimitType = "text")
                ? textCount
                : wordCount;
            // Update current count
            updater(currentEl, setTypeCount);
            // Update remainder count
            updater(remainderEl, defaults.limiter.max - setTypeCount);
            // Custom callback function helpers
            // Update filtered words/characters counter
            if (oldElValueLength > textCount)
                wordFilterCounter++;
            updater(filterCountEl, wordFilterCounter);
            // Percentage of current count
            const percentCount = Math.floor((setTypeCount * 100) / defaults.limiter.max);
            // Call callback function with default arguments
            if (defaults.callbackFunc) {
                caller.customFn(defaults.callbackFunc, {
                    eventType: events,
                    numOfInputTexts: textCount,
                    numOfInputWords: wordCount,
                    inputs: newElValue,
                    inputCount: setTypeCount,
                    inputPercentage: percentCount,
                    numOfInputFiltered: wordFilterCounter,
                });
            }
        },
    };
    return {
        set: defaults.rules,
        init: main.init,
        ver: "1.0.0", // Plugin version
    };
})();
export default { reactiveTextArea };
