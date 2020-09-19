module.exports = {
  target: "node",
  entry: __dirname + "/src/index.tsx",
  // output: {
  //   libraryTarget: "node",
  // },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json", ".mjs"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
};
