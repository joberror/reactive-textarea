import { reactiveTextArea } from "/lib/esm/index.mjs";

let textarea = document.querySelector("textarea");
if (textarea) textarea.value = "Here is a mad text example";

reactiveTextArea.config({
    element: textarea,
    countOrLimitType: "word",
    enableCounter: true,
    enableLimiter: true,
    enableFilter: true,
    maxAllowed: 30,
    wordsToFilter: ["mad", "stupid"],
});

const button = document.querySelector("button");

button.addEventListener("click", (event) => {
    reactiveTextArea.reset();
});

reactiveTextArea.init();


