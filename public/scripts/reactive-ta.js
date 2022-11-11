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
			 * Textarea element to attach to
			 * @type {Object}
			 * @example document.querySelector('textarea')
			 */
			el: "",
			/**
			 * Text limit allowed
			 * @type {Number}
			 */
			limit: 200,
			/**
			 * Words not allowed
			 * @type {string | null}
			 * @example mad|fool|sad|shit
			 */
			unAllowed: null,
			/**
			 * Enable strictness on word filtering
			 * @type {boolean}
			 */
			strict: false,
			/**
			 * An optional function to call
			 * @type {Object}
			 */
			customFunc: null,
			/**
			 * Class to set remainder
			 * @type {string}
			 * @example 'span .remainder'
			 */
			remCount: null,
			/**
			 * Class to set total
			 * @type {string}
			 * @example 'span .total'
			 */
			totalCount: null,
			/**
			 * Class to current position
			 * @type {string}
			 * @example 'span .current-no'
			 */
			curCount: null,
			rules: (e) => Object.assign(defaults, e),
		},
		// filtered words count variable
		filterCount = 0,
		/**
		 * Helpers
		 * @type {{total: (function(): number), rem: (function(*): *)}}
		 */
		update = {
			total: () => {
				if (defaults.totalCount)
					document.querySelector(defaults.totalCount).innerHTML =
						defaults.limit;
			},
			/**
			 * A function to set current position
			 * @param {Number} val
			 */
			counter: (val) => {
				if (defaults.curCount)
					document.querySelector(defaults.curCount).innerHTML = val;
			},
			/**
			 * A function to set remaining value
			 * @param {Number} val
			 */
			rem: (val) => {
				if (defaults.remCount)
					document.querySelector(defaults.remCount).innerHTML = val;
			},
		},
		// Set up custom function
		call = {
			fn: (callback, args) => {
				if (typeof callback == "function") {
					callback(args);
				}
			},
		},
		fn = {
			reg: {
				strict: "",
				nStrict: "",
			},

			init: () => {
				let filters = defaults.unAllowed,
					el = defaults.el,
					nsFilter;

				nsFilter =
					"(?:(^|[^a-z]))(([^a-z]*)(?=" +
					filters +
					")" +
					filters +
					")(?![a-z])";

				// Register filter words
				fn.reg.strict = filters && new RegExp(filters, "gi");
				fn.reg.nStrict = new RegExp(nsFilter, "gi");
				update.total();

				if (el.tagName === "TEXTAREA") {
					["input", "cut", "keypress", "paste", "blur"].forEach((e) =>
						el.addEventListener(e, (ev) => {
							fn.process(el, ev);
						})
					);
				}
			},

			/**
			 *
			 * @param {object} el
			 * @param {event} events
			 */
			process: (el, events) => {
				let lt,
					pc,
					wc,
					elVal,
					// Store old el value length
					oldElVal = el.value.length;
				// If input is above limit, truncate.
				el.value = el.value.substr(0, defaults.limit);

				// Filter words
				if (events.code === "Space" || events.type === "blur") {
					el.value = defaults.strict
						? el.value.replace(fn.reg.strict, "")
						: el.value.replace(fn.reg.nStrict, "");
				}

				elVal = el.value;
				lt = elVal.length;

				// count no of filtered words
				if (oldElVal > lt) filterCount++;

				// set counter
				update.counter(lt);

				// set reverse counter
				update.rem(defaults.limit - lt);

				// calculate percentage of total length
				pc = parseInt((lt * 100) / defaults.limit);

				// calculate no of words
				wc = elVal.split(" ").filter((word) => word !== "").length;

				// Call custom functions with default arguments
				if (defaults.customFunc)
					call.fn(defaults.customFunc, {
						events: events, // Event type
						inputs: elVal, // Current text
						inputPercent: pc, // Percentage
						noOfTexts: lt, // Updated text count
						noOfWords: wc, // No of words typed
						noOfWordsFiltered: filterCount, // No of filtered words
					});
			},
		};

	return {
		set: defaults.rules, // Set all options
		init: fn.init, // Call to initialize
		ver: 2.5, // Plugin version
	};
})();

export { reactiveTextArea };
