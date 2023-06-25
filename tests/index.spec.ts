import "mocha";
import { assert, expect } from "chai";

import { reactiveTextArea } from '../src/index';

import { JSDOM } from "jsdom";

declare global {
  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
    }
  }
}

const { window } = new JSDOM(`
         <body>
           <textarea name="reactiveA"></textarea>
           <span class="total-allowed"></span>
           <span class="total-current"></span>
           <span class="remainder"></span>
           <span class="filter-count"></span>
         </body>
  `);
global.document = window.document;
window.reactiveTextArea = reactiveTextArea;

var textarea = document.querySelector("textarea");
var spanA = document.querySelector(".total-allowed");
if (textarea) textarea.value = "Here's a mad text example";
// set default settings
window.reactiveTextArea.set({
  el: textarea,
  countOrLimitType: "text",
  limiter: { on: true, max: 150 },
  screener: { words: "mad|hoe", strict: false },
  counter: true,
  helpers: {
    totalCountEl: spanA,
    curCountEl: ".total-current",
    remCountEl: ".remainder",
    filterCountEl: ".filter-count",
  },
  callbackFunc: null,
});

window.reactiveTextArea.init();

describe("mocha tests", function () {
  it("should be an object", () => {
    assert.isObject(window.reactiveTextArea);
  });

  it("should have version", () => {
    assert.property(window.reactiveTextArea, "ver");
  });

  it(`should confirm version to be ${reactiveTextArea.ver}`, () => {
    assert.equal(window.reactiveTextArea.ver, "1.0.0");
  });
});
