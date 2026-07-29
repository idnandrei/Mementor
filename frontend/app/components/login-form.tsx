"use client";
import Link from "next/link";
import { useState } from "react";
import { loginSchema } from "@/lib/validation/auth";
import { getApiErrorMessage } from "@/lib/api/error";
import { useAuth } from "@/hooks/useAuth";

export function LoginForm() {
  const [message, setMessage] = useState<string | null>(null);
  const { login, isLoggingIn } = useAuth();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    const formData = new FormData(event.currentTarget);

    const validation = loginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validation.success) {
      setMessage(validation.error.issues[0]?.message ?? "Check login details.");
      return;
    }
    login(
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
      <form
        className="grid gap-5"
        onSubmit={handleSubmit}
        method="post"
        noValidate
      >
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
            required
            autoComplete="email"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
            placeholder="you@example.com"
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-foreground"
            >
              Password
            </label>
            <Link
              href="#"
              className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            className="h-4 w-4 accent-primary"
          />
          <label htmlFor="remember" className="text-sm text-muted-foreground">
            Remember me on this device
          </label>
        </div>

        {message && (
          <p role="alert" className="text-sm text-destructive">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="w-full cursor-pointer rounded-xl border border-transparent bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? "Logging in..." : "Sign in"}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          Create one
        </Link>
      </p>
    </>
  );
}
