module.exports = {
  name: 'api',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/api',
  collectCoverageFrom: ['src/lib/**/*.ts', '!src/testing/**/*.ts']
};
