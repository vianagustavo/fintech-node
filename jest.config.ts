export default {
  preset: 'ts-jest',
  clearMocks: true,
  modulePaths: ['<rootDir>'],

  coverageProvider: 'v8',

  testMatch: ['**/**/*.spec.ts'],

  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
};
