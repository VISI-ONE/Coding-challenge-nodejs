/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "mjs", "cjs", "json", "node"],

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.m?js$": "babel-jest",
  },
};

export default config;
