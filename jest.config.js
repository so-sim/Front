/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTest.ts'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
    '^.+\\.svg$': 'jest-transformer-svg',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    //이렇게 모든 css를 styleMock으로 덮어씌워 주는 것
    '\\.(css|less)$': '<rootDir>/src/tests/styleMock.ts',
  },
};
