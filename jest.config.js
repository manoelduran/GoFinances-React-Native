module.exports = {
    preset: "jest-expo",
    testPathIgnorePatterns: [
        '/node_modules/',
        '/android',
        '/ios'
    ],
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
    ],
    setupFilesAfterEnv: [
        "@testing-library/jest-native/extend-expect",
        "jest-styled-components"
    ],
    setupFiles: ["./setupFile.js"],
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.tsx",
    "!src/**/*.spec.tsx"
],
coverageReporters: [
"lcov"
],
    "automock": false,
    "resetMocks": false,
}