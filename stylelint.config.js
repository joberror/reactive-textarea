module.exports = {
	extends: ["stylelint-config-standard", "stylelint-config-prettier"],
	ignoreFiles: ["**/*.js"],
	plugins: ["stylelint-scss", "stylelint-order", "stylelint-group-selectors"],
	rules: {
		"at-rule-no-unknown": null,
		"scss/at-rule-no-unknown": true,
		"color-named": "always-where-possible",
		"scss/at-function-named-arguments": "never",
		"selector-max-type": 5,
		"selector-max-compound-selectors": 6,
		"max-nesting-depth": 6,
		"plugin/stylelint-group-selectors": true,
	},
};