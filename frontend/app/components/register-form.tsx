"use client";

import Link from "next/link";
import { useState } from "react";

import { registerSchema } from "@/lib/validation/auth";
import { getApiErrorMessage } from "@/lib/api/error";

import { useAuth } from "@/hooks/useAuth";

export function RegisterForm() {
  const { register, isRegistering } = useAuth();
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    const formData = new FormData(event.currentTarget);

    const validation = registerSchema.safeParse({
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validation.success) {
      setMessage(validation.error.issues[0]?.message ?? "Check your details.");

      return;
    }
    register(
      { body: validation.data },
      {
        onError: (error) => {
          setMessage(getApiErrorMessage(error));
        },
      },
    );
  }

  return (
    <>
      <form className="grid gap-5" method="post" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <label
            htmlFor="username"
            className="text-sm font-semibold text-foreground"
          >
            Username
          </label>

          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
            placeholder="yourname"
            disabled={isRegistering}
          />
        </div>

        <div className="grid gap-2">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-foreground"
          >
            Email address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
            placeholder="you@example.com"
            disabled={isRegistering}
          />
        </div>

        <div className="grid gap-2">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-foreground"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
            placeholder="Create a password"
            disabled={isRegistering}
          />
        </div>

        {message && (
          <p role="alert" className="text-sm text-destructive">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={isRegistering}
          className="w-full cursor-pointer rounded-xl border border-transparent bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isRegistering ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
