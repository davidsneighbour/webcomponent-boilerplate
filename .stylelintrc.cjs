module.exports = {
  extends: "stylelint-config-standard",
  rules: {
    "selector-type-case": null, // Disable the enforcement of lowercase type selectors
    "selector-type-no-unknown": [
      true,
      {
        ignore: ["custom-elements"], // Allow custom elements
      },
    ],
  },
  customSyntax: "postcss-html", // Enable support for CSS in HTML-like files
};
