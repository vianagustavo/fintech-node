export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  modulePaths: ['<rootDir>'],
  coverageProvider: 'v8',
  testMatch: ['**/**/*.spec.ts'],
  moduleDirectories: ['node_modules', 'src'],
};
