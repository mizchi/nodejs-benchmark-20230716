module.exports = {
  target: "node",
  entry: __dirname + "/src/index.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".wasm"],
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
