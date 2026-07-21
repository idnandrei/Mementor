import Link from "next/link";

export function LoginForm() {
  return (
    <>
      <form className="grid gap-5" action="#" method="post">
        <div className="grid gap-2">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="form-input"
            placeholder="you@example.com"
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Link href="#" className="text-link">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="form-input"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            className="h-4 w-4 accent-accent-strong"
          />
          <label htmlFor="remember" className="text-sm text-muted-foreground">
            Remember me on this device
          </label>
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-xl border-0 bg-accent px-4 py-3 text-sm font-bold text-on-accent transition hover:bg-accent-hover focus-visible:shadow-focus-strong focus-visible:outline-none active:translate-y-px"
        >
          Sign in
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-link">
          Create one
        </Link>
      </p>
    </>
  );
}
