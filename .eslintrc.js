module.exports = {
  plugins: ["perfectionist"],
  rules: {
    "perfectionist/sort-objects": [
      "error",
      {
        type: "alphabetical",
      },
    ],
    "perfectionist/sort-interfaces": ["error"],
  },
  settings: {
    perfectionist: {
      type: "line-length",
      partitionByComment: true,
    },
  },
};
