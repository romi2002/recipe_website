module.exports = {
  preset: 'jest-puppeteer',
  testRegex: './*\\e2e\\.test\\.js$',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
}
