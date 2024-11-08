const path = require('path');

module.exports = {
  // Set the entry point of your project
  entry: './src/index.ts',  // Replace with the main TypeScript file in your project

  // Set the output configuration
  output: {
    filename: 'bundle.js',  // The name of the bundled file
    path: path.resolve('./', 'dist'),  // The output directory
    library: 'MyChartLibrary',  // Global variable for your package
    libraryTarget: 'umd',  // Universal module definition for compatibility (CommonJS, AMD, etc.)
    globalObject: 'this',  // Ensure that the package works in Node.js and browser
  },

  // Configure the TypeScript loader
  module: {
    rules: [
      {
        test: /\.tsx?$/,  // Match TypeScript files
        use: 'ts-loader',  // Use ts-loader to compile the TypeScript files
        exclude: /node_modules/,  // Exclude node_modules folder
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],  // Resolve both .ts and .js files
  },

  // For development mode (optional, you can also use production)
  mode: 'development',

  // For source map support (optional)
  devtool: 'source-map',
};
