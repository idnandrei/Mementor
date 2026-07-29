import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "./openapi.json",
  output: "./generated/api",
  plugins: [
    "@hey-api/typescript",
    "@hey-api/sdk",
    {
      name: "@hey-api/client-fetch",
      runtimeConfigPath: "./lib/api/browser-runtime.ts",
    },
    {
      name: "@tanstack/react-query",
      queryOptions: true,
      queryKeys: {
        tags: true,
      },
      mutationOptions: true,
      mutationKeys: true,
    },
  ],
});
