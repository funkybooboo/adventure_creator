import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    rootDir: './',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    coverageDirectory: 'coverage', // Output directory for coverage reports
    collectCoverage: true,         // Enable coverage collection
    coverageReporters: ['text', 'lcov', 'json'], // Different formats for coverage reports
};

export default config;
