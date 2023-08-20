"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactiveTextArea = void 0;
/**
 * A textarea element plugin to count, limit, filter and trigger a function
 * @interface
 */
exports.reactiveTextArea = (function () {
    /**
     * All parameters that can be set
     * @namespace
     */
    let defaults = {
        element: "",
        enableCounter: true,
        countOrLimitType: "text",
        enableFilter: false,
        enableLimiter: false,
        maxAllowed: 0,
        wordsToFilter: [],
        enableStrictFiltering: false,
        callbackFunc: undefined,
    }, callbackHelpers = {
        events: Event.prototype,
        numOfInputTexts: 0,
        numOfInputWords: 0,
        inputs: "",
        inputsCount: 0,
        inputsPercentage: 0,
        numOfWordsFiltered: 0,
        maxAllowed: defaults.maxAllowed,
    }, 
    // helper element cache
    helpers = {
        curCountEl: document.querySelector(".reactiveTextArea_curCount"),
        totalAllowedEl: document.querySelector(".reactiveTextArea_maxAllowed"),
        remCountEl: document.querySelector(".reactiveTextArea_remCount"),
        filterCountEl: document.querySelector(".reactiveTextArea_filterCount"),
    }, 
    // store textarea value before filtering
    oldElValueLength = 0, 
    // shadow copy callback helpers
    _callbackHelpers = Object.assign({}, callbackHelpers);
    function resetAll() {
        defaults.element.value = "";
        Object.assign(callbackHelpers, _callbackHelpers);
        defaults.element.dispatchEvent(new Event('input', { bubbles: true }));
    }
    function filterWordsFromString(inputString, wordsToFilter, partialMatch = false) {
        const filterPattern = partialMatch
            ? new RegExp(wordsToFilter.join("|"), "gi")
            : new RegExp(`\\b(${wordsToFilter.join("|")})\\b`, "gi");
        const result = inputString.replace(filterPattern, "");
        return result;
    }
    function truncateString(inputString, limit) {
        return defaults.countOrLimitType === "word"
            ? inputString.split(" ").slice(0, limit).join(" ")
            : inputString.slice(0, limit);
    }
    function updateHelperElements(el, val) {
        el.textContent = val.toString();
    }
    function processCounter(inputVar) {
        // update all counts
        callbackHelpers.inputs = inputVar;
        callbackHelpers.numOfInputTexts = inputVar.length;
        callbackHelpers.numOfInputWords = inputVar
            .split(/\s+/)
            .reduce((count, word) => count + (word !== "" ? 1 : 0), 0);
        // Current count
        callbackHelpers.inputsCount =
            defaults.countOrLimitType === "word"
                ? callbackHelpers.numOfInputWords
                : callbackHelpers.numOfInputTexts;
        if (helpers.curCountEl)
            updateHelperElements(helpers.curCountEl, callbackHelpers.inputsCount);
        // Filter count
        if (oldElValueLength > callbackHelpers.numOfInputTexts)
            callbackHelpers.numOfWordsFiltered++;
        if (helpers.filterCountEl)
            updateHelperElements(helpers.filterCountEl, callbackHelpers.numOfWordsFiltered);
        // Limit count
        if (defaults.maxAllowed) {
            callbackHelpers.inputsPercentage = Math.floor((callbackHelpers.inputsCount * 100) / defaults.maxAllowed);
            // update remainder helper element
            if (helpers.remCountEl)
                updateHelperElements(helpers.remCountEl, defaults.maxAllowed - callbackHelpers.inputsCount);
        }
        // Callback function processing
        if (defaults.callbackFunc &&
            typeof defaults.callbackFunc === "function") {
            defaults.callbackFunc(callbackHelpers);
        }
    }
    function processFilter(el) {
        if (defaults.enableFilter) {
            if (callbackHelpers.events.type === "input" ||
                callbackHelpers.events.type === "blur")
                el.value = defaults.enableStrictFiltering
                    ? filterWordsFromString(el.value, defaults.wordsToFilter, true)
                    : filterWordsFromString(el.value, defaults.wordsToFilter);
        }
        processCounter(el.value);
    }
    function processLimiter(element) {
        // trim inputs in textarea to max allowed.
        if (defaults.enableLimiter && defaults.maxAllowed)
            element.value = truncateString(element.value, defaults.maxAllowed);
        // store textarea length.
        oldElValueLength = element.value.length;
        // process filter if enabled
        return defaults.enableFilter
            ? processFilter(element)
            : processCounter(element.value);
    }
    function init() {
        let el = defaults.element;
        if (el.tagName === "TEXTAREA" &&
            (defaults.enableCounter || defaults.enableLimiter)) {
            // register event
            ["input", "cut", "keyup", "paste", "blur", "change"].forEach(function (e) {
                el.addEventListener(e, function (ev) {
                    callbackHelpers.events = ev;
                    processLimiter(el);
                });
            });
            // update Total allowed helper element
            if (helpers.totalAllowedEl && defaults.maxAllowed)
                updateHelperElements(helpers.totalAllowedEl, defaults.maxAllowed);
        }
    }
    return {
        config: (options) => Object.assign(defaults, options),
        init,
        reset: resetAll,
    };
})();
exports.default = { reactiveTextArea: exports.reactiveTextArea };
