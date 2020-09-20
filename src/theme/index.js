const defaultColors = require('./default-vars');
const darkColors = require('./dark-vars');
const lightColors = require('./light-vars');
const nightColors = require('./night-vars');

module.exports = {
  dark: { ...defaultColors, ...darkColors },
  light: { ...defaultColors, ...lightColors },
  night: { ...defaultColors, ...nightColors }
};
