module.exports = {
  root: true,
  env: {
    es2022: true,
    browser: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "warn",
    "prefer-const": "error",
  },
};
