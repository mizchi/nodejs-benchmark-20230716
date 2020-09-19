module.exports = {
  apps: {
    name: "4000",
    script: "./lib/index.js",
    exec_mode: "cluster",
    instances: "max",
    env: {
      NODE_ENV: "production",
    },
  },
};
