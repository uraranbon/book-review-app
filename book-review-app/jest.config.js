module.exports = {
  transform: {
    '^.+\\.(css|scss)$': 'jest-transform-stub',
    "^.+\\.jsx?$": "babel-jest"
  },
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["node_modules/(?!axios)"],
};