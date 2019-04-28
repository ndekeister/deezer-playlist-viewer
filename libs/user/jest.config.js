module.exports = {
  name: 'user',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/user',
  collectCoverageFrom: ['src/lib/**/*.ts', '!src/testing/**/*.ts']
};
