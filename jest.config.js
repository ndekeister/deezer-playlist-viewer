module.exports = {
    globals: {
        'ts-jest': {
            tsConfigFile: 'tsconfig.spec.json'
        },
        __TRANSFORM_HTML__: true
    },
  testMatch: ["**/+(*.)+(spec|test).+(ts|js)?(x)"],
  transform: {
    "^.+\\.(ts|js|html)$": "ts-jest"
  },
  resolver: "@nrwl/builders/plugins/jest/resolver",
  moduleFileExtensions: ["ts", "js", "html"],
  collectCoverage: true,
  coverageReporters: ["html"],
    setupTestFrameworkScriptFile: "./src/test-setup.ts"
};
