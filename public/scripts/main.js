// Import reactive textarea plugin
import { reactiveTextArea as plugin } from "./reactive-ta-min.js";

// Set version of plugin
document.querySelector(".version").innerHTML = `v${plugin.ver}`;

// Pagination
let pagLinks = document.querySelectorAll(".main a") /** get links */,
	getWrapper =
		document.querySelector(".wrapper").children; /** get main wrapper */

pagLinks.forEach((el, index) => {
	/** switch examples */
	el.onclick = (e) => {
		document.querySelectorAll(".main a.active")[0].classList.toggle("active");
    el.classList.toggle("active");
    /** hide examples */
		for (var i = 0; i < getWrapper.length; i++)
			getWrapper[i].classList.add("hide");
		document.querySelector(".example" + el.dataset.ex).classList.remove("hide");
		/** initialize plugin per example */
    conf(el.dataset.ex);
		e.preventDefault();
	};
});

// Setup Examples
// Example 1
let exampleA = document.querySelector(".example0 textarea"),
  exampleB = document.querySelector(".example1 textarea"),
  exampleC = document.querySelector(".example2 textarea"),
  wordCounter = document.querySelector(".example2 span.wordC"),
  filterWords = document.querySelector(".example2 span.filterC"),
  pieChart = document.querySelector(".progress-pie-chart"),
  pieChartProg = document.querySelector(".ppc-progress-fill");

let allExConfig = [
	{
		limit: 150,
		el: exampleA,
		curCount: "span.countA",
		totalCount: "span.totalA",
	},
	{
		limit: 180,
		el: exampleB,
		curCount: "span.countB",
		totalCount: "span.totalB",
		unAllowed: "fool|mad|hoe|stupid",
		strict: true,
	},
	{
		limit: 200,
		el: exampleC,
		remCount: "span.remC",
		unAllowed: "fool|mad|hoe|stupid|fuck|idiot",
		customFunc: logDetails,
	},
];


// Custom function to call
function logDetails(args) {
	wordCounter.innerHTML = `${args.noOfWords}`;
	filterWords.innerHTML = args.noOfWordsFiltered;

	//
	let percent = parseInt(args.inputPercent),
		deg = (360 * percent) / 100;

	// If words is almost used up, add a red background
	if (percent > 90) pieChart.classList.add("gt-50");
	else pieChart.classList.remove("gt-50");

	// Apply transform based on percentage
	Object.assign(pieChartProg.style, { transform: "rotate(" + deg + "deg)" });
}

// assign config and initialize plugins
let
  conf = (el) => {
    plugin.set(allExConfig[el]);
    plugin.init();
	};

conf(0);
