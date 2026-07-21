import Link from "next/link";

export function RegisterForm() {
  return (
    <>
      <form className="grid gap-5" action="#" method="post">
        <div className="grid gap-2">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            className="form-input"
            placeholder="yourname"
          />
        </div>

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
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="form-input"
            placeholder="Create a password"
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-xl border-0 bg-accent px-4 py-3 text-sm font-bold text-on-accent transition hover:bg-accent-hover focus-visible:shadow-focus-strong focus-visible:outline-none active:translate-y-px"
        >
          Create account
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-link">
          Sign in
        </Link>
      </p>
    </>
  );
}
