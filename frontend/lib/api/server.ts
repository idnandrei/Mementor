import "server-only";

import { cookies } from "next/headers";
import { connection } from "next/server";

import { createClient } from "@/generated/api/client";

export async function createServerApiClient() {
  await connection();

  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    throw new Error("BACKEND_URL is not configured");
  }

  const cookieStore = await cookies();

  return createClient({
    baseUrl: backendUrl.replace(/\/$/, ""),
    headers: {
      cookie: cookieStore.toString(),
    },
  });
}
