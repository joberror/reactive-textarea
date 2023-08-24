interface ReactiveTextAreaOptions {
    /**
     * Textarea element to target
     * @default null
     */
    element: HTMLTextAreaElement;
    /**
     * What to count and/or limit
     * @default "text"
     */
    countOrLimitType?: "text" | "word";
    /**
     * Enable text or word counter
     * @default true
     */
    enableCounter: boolean;
    /** Enable limiting based on countOrLimitType
     * @default false
     */
    enableLimiter?: boolean;
    /** Set maximum number of text/word allowed
     *  @default 0
     */
    maxAllowed?: number;
    /** Enable word filtering
     * @default false
     */
    enableFilter?: boolean;
    /** Set list of words to be filtered separated in an array format
     * @default []
     * @example ["mad", "stupid"]
     */
    wordsToFilter?: Array<string>;
    /** Enable strict filtering
     * @default false
     */
    enableStrictFiltering?: boolean;
    /** Set an optional function to be called, read more about this in the README file. */
    callbackFunc?: Function;
}
/**
 * A textarea element plugin to count, limit, filter and trigger a function
 * @interface
 */
export declare let reactiveTextArea: {
    config: (options: object) => ReactiveTextAreaOptions & object;
    init: () => void;
    reset: (all?: boolean) => void;
};
declare const _default: {
    reactiveTextArea: {
        config: (options: object) => ReactiveTextAreaOptions & object;
        init: () => void;
        reset: (all?: boolean) => void;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map