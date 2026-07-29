import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().pipe(z.email("Enter a valid email address")),

  password: z
    .string()
    .min(1, "Password is required")
    .max(128, "Password is too long"),
});

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username is required")
    .max(50, "Username is too long"),

  email: z.string().trim().pipe(z.email("Enter a valid email address")),

  password: z
    .string()
    .min(3, "Password must contain at least 3 characters")
    .max(128, "Password is too long"),
});
