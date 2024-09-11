// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "plugin:perfectionist/recommended-alphabetical-legacy"],
  plugins: ["perfectionist"],
  rules: {
    "perfectionist/sort-objects": [
      "error",
      {
        type: "alphabetical",
      },
    ],
  },
};
