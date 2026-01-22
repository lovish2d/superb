const ignore_files = [
  ".git",
  "**/node_modules/**",
  "assets",
  "confirmation_files",
  "**/*.log",
  "logs",
  "**/logs/**",
];

module.exports = {
  apps: [
    {
      name: "aviation-auth-service",
      namespace: "webmob-aviation",
      script: "./services/auth-service/server.js",
      watch: true,
      autorestart: true,
      ignore_watch: ignore_files,
      env: {
        ENV: "LOCAL",
        PORT: 2001,
        SERVICE_NAME: "auth-service",
      },
      node_args: "--trace-warnings",
    },
    {
      name: "aviation-platform-service",
      namespace: "webmob-aviation",
      script: "./services/platform-service/server.js",
      watch: true,
      autorestart: true,
      ignore_watch: ignore_files,
      env: {
        ENV: "LOCAL",
        PORT: 2002,
        SERVICE_NAME: "platform-service",
      },
      node_args: "--trace-warnings",
    },
    {
      name: "aviation-resource-service",
      namespace: "webmob-aviation",
      script: "./services/resource-service/server.js",
      watch: true,
      autorestart: true,
      ignore_watch: ignore_files,
      env: {
        ENV: "LOCAL",
        PORT: 2004,
        SERVICE_NAME: "resource-service",
      },
      node_args: "--trace-warnings",
    },
  ],
};
