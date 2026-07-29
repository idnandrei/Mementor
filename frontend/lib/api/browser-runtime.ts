import type { CreateClientConfig } from "@/generated/api/client.gen";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: apiUrl.replace(/\/$/, ""),
  credentials: "include",
});
