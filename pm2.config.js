module.exports = {
  apps: {
    name: "4000",
    script: "./lib/index.js",
    exec_mode: "cluster",
    instances: "max",
    env: {
      PORT: 4000,
      NODE_ENV: "production",
      FASTIFY: true,
    },
  },
};
