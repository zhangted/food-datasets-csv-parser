module.exports = {
  hooks: {
    "pre-commit":
      "pretty-quick --staged && lint-staged -c lint-staged.config.js"
  }
};
