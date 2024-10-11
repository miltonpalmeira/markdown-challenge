import dotenv from "dotenv";
process.env.NODE_ENV = "test";
dotenv.config({ path: "./.env.test" });

export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["js", "ts"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
