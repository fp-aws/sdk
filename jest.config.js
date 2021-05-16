//
// References:
// Reusing tsconfig paths in jest:
// https://kulshekhar.github.io/ts-jest/user/config/#jest-config-with-helper
//

const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require('./tsconfig.paths.json');

module.exports = {
  transform: {
    ".(ts|tsx)": "ts-jest"
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleFileExtensions: ["ts", "tsx", "js"],
  collectCoverageFrom: [
    "**/*.{js,ts}",
    "!**/node_modules/**",
  ],
  testPathIgnorePatterns: [
    "dist/"
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
};