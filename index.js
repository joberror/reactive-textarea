/**
 * A textarea element plugin to count, limit and trigger a function
 * @interface
 */
let reactiveTextArea = (() => {
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
				words: null,
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
				totalAllowedEl: null,
				/**
				 * Helper element to display total current of texts/words typed
				 * @type {HTMLElement}
				 * @example span.total-current
				 */
				currentEl: null,
				/**
				 * Helper element to display remaining texts/words allowed
				 * @type {HTMLElement}
				 * @example span.remainder
				 */
        remainderEl: null,

        /**
         * Helper element to display filtered words count
         * @type {HTMLElement}
         * @example span.filter-count
         */
        filterCountEl: null
			},
			rules: (e) => Object.assign(defaults, e),
		},
		// Initialize word filter counter
		wordFilterCounter = 0,
		// initialize object to update all helper elements and callback features
		totalAllowedEl = document.querySelector(defaults.helpers.totalAllowedEl),
		currentEl = document.querySelector(defaults.helpers.currentEl),
    remainderEl = document.querySelector(defaults.helpers.remainderEl),
    filterCountEl = document.querySelector(defaults.helpers.filterCountEl),
		updater = {
			/**
			 * Sets the total allowed element content to the default limiter's max value.
			 *
			 * @return {void} This function does not return anything.
			 */
			total: () => {
				totalAllowedEl.textContent = defaults.limiter.max;
			},

			/**
			 * Sets the text of the current count element to the given value.
			 *
			 * @param {number} val - The value to set the current element to.
			 */
			curCount: (val) => {
				currentEl.textContent = val;
			},

			/**
			 * Sets the text content of remainderEl to the given value.
			 *
			 * @param {number} val - The value to set the text content of remainderEl to.
			 */
			remCount: (val) => {
				remainderEl.textContent = val;
      },

      /**
       * Updates the text content of the filter count element.
       *
       * @param {number} val - The new value for the filter count element.
       * @return {void} This function does not return anything.
       */
      filterCount: (val) => {
        filterCountEl.textContent = val;
      }
		},
		// initialize object to call a custom function
		caller = {
			customFn: (callback, args) => {
				if (typeof callback == "function") {
					callback(args);
				}
			},
		},
		// Initialize and process all features
		main = {
			// Initiate regular expression for word filter
			filterRegExp: {
				// when strict is set to "true"
				strictFilter: null,
				// when strict is set to "false"
				nonStrictFilter: null,
			},

			init: () => {
				let filters = defaults.screener.words;
				let mainEl = defaults.el;
				let nsf =
					"(?:(^|[^a-z]))(([^a-z]*)(?=" +
					filters +
					")" +
					filters +
					")(?![a-z])";

				// Register strict filter regular expression
				main.filterRegExp.strictFilter = filters && new RegExp(filters, "gi");
				// Register non-strict filter regular expression
				main.filterRegExp.nonStrictFilter = new RegExp(nsf, "gi");

				// Instantly update limit count helper element
				if (totalAllowedEl) updater.total();

				// Processes
				// Check for textarea tag and if counter or limiter is on to avoid unnecessary processing or iteration.
				if (
					mainEl.tagName === "TEXTAREA" &&
					(defaults.counter || defaults.limiter.on)
				) {
					// Add event listeners
					["input", "cut", "keypress", "paste", "blur"].forEach((e) =>
						mainEl.addEventListener(e, (ev) => {
							// Let's process
							main.process(mainEl, ev);
						})
					);
				}
			},
			process: (el, events) => {
				// A function that truncates a string based on a text or word limit
				function truncateString(inputString, limit) {
					if (defaults.countOrLimitType === "text") {
						return inputString.slice(0, limit);
					} else {
						const stringArray = inputString.split(" ");
						const truncatedArray = stringArray.slice(0, limit);
						return truncatedArray.join(" ");
					}
				}

				// Truncate textarea value to the limit set
				el.value = truncateString(el.value, defaults.limiter.max);

				// Store length of incoming variables from textarea (text)
				// This is needed for filtering
				let oldElValueLength = el.value.length;

				// Filtering
				// Check if filter variable is set
				if (defaults.screener.words) {
					// Listen to keypad event
					if (events.code === "Space" || events.type === "blur") {
						// Check if strict is set to true
						el.value = defaults.screener.strict
							? el.value.replace(main.filterRegExp.strictFilter, "")
							: el.value.replace(main.filterRegExp.nonStrictFilter, "");
					}
				}

				// Set new value after filtering and limiting
				let newElValue = el.value;

				// Counter type helper
				let textCount = newElValue.length,
					wordCount = newElValue
						.split(" ")
						.filter((word) => word !== "").length,
					setTypeCount = (defaults.countOrLimitType = "text")
						? textCount
						: wordCount;

				// Update current count
				if (currentEl) updater.curCount(setTypeCount);

				// Update remainder count
				if (remainderEl) updater.remCount(defaults.limiter.max - setTypeCount);

				// Custom callback function helpers
				// Update filtered words/characters counter
        if (oldElValueLength > textCount) wordFilterCounter++;
        if (filterCountEl) updater.filterCount(wordFilterCounter);

				// Percentage of current count
				let percentCount = parseInt(
					(setTypeCount * 100) / defaults.limiter.max
				);

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
		set: defaults.rules, // Set all options
		init: main.init, // Call to initialize
		ver: '3.0.0', // Plugin version
	};
})();

if (typeof module === "object") module.exports = reactiveTextArea;
