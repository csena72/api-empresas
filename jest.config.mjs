export default {
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  // Transpilamos los módulos 'mongodb' y 'mongodb-memory-server'
  transformIgnorePatterns: [
    "/node_modules/(?!(mongodb|mongodb-memory-server)/)",
  ],
};

