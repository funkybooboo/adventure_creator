export default {
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.ts$': ['ts-jest', { useESM: true }],
    },
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1', // Map `.js` extensions in imports to `.ts` files
    },
    testEnvironment: 'node',
};
