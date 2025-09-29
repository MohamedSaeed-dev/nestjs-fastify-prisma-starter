module.exports = {
  // Test Environment
  testEnvironment: 'node',

  // Module File Extensions
  moduleFileExtensions: ['js', 'json', 'ts'],

  // Root Directory
  rootDir: '.',

  // Test Match Patterns
  testRegex: '.*\\.spec\\.ts$',
  testMatch: ['**/__tests__/**/*.(ts|js)', '**/*.(test|spec).(ts|js)'],

  // Transform Configuration
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  // Coverage Configuration
  collectCoverageFrom: [
    'src/**/*.(t|j)s',
    '!src/**/*.spec.ts',
    '!src/**/*.test.ts',
    '!src/**/*.interface.ts',
    '!src/**/*.dto.ts',
    '!src/**/*.enum.ts',
    '!src/main.ts',
    '!src/generated/**/*',
  ],

  // Coverage Directory
  coverageDirectory: 'coverage',

  // Coverage Reporters
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],

  // Coverage Thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // Module Name Mapping (for path aliases)
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/common/(.*)$': '<rootDir>/src/common/$1',
    '^@/core/(.*)$': '<rootDir>/src/core/$1',
    '^@/modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@/generated/(.*)$': '<rootDir>/src/generated/$1',
  },

  // Setup Files
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],

  // Test Timeout
  testTimeout: 10000,

  // Verbose Output
  verbose: true,

  // Clear Mocks
  clearMocks: true,

  // Restore Mocks
  restoreMocks: true,

  // Global Setup/Teardown
  globalSetup: '<rootDir>/test/global-setup.ts',
  globalTeardown: '<rootDir>/test/global-teardown.ts',

  // Max Workers
  maxWorkers: '50%',

  // Cache Directory
  cacheDirectory: '<rootDir>/.jest-cache',

  // Ignore Patterns
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', '<rootDir>/coverage/'],

  // Watch Plugins
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],

  // Error on Deprecated
  errorOnDeprecated: true,

  // Notify Mode
  notify: false,

  // Bail on First Error (for CI)
  bail: false,
};
