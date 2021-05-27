module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '/__tests__/.*.test.(js|ts)?$',
  moduleFileExtensions: ['ts', 'js', 'jsx', 'json', 'node'],
};
