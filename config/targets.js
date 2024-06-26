'use strict';

const browsers = [
  'last 1 Chrome versions',
  'last 1 Firefox versions',
  'last 1 Safari versions',
  'last 1 edge versions',
];

const isCI = Boolean(process.env.CI);
const isProduction = process.env.EMBER_ENV === 'production';

if (isCI || isProduction) {
  // Remove ie support
  // browsers.push('ie 11');
}

module.exports = {
  browsers,
  node: 'current',
};
