import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }],
    },
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testEnvironment: 'jest-environment-jsdom',
    collectCoverage: true,
    coverageDirectory: '<rootDir>/coverage',
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
};

export default config;
