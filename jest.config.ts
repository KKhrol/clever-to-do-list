export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@context/(.*)$': '<rootDir>/src/context/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/config/tests/testSetup.ts'],
};
