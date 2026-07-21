export function LoginCard() {
  return (
    <main className="grid min-h-screen place-items-center bg-background p-5 text-foreground sm:p-8">
      <section className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_22px_70px_oklch(44.6%_0.043_257.3_/_0.10)] lg:grid-cols-[0.95fr_1.05fr]">
        <aside
          className="hidden border-r border-border bg-linear-to-br from-background to-accent/25 p-12 lg:flex lg:min-h-168 lg:flex-col lg:justify-between"
          aria-label="Mementor overview"
        >
          <p className="font-heading text-6xl leading-none font-bold tracking-tighter text-foreground">
            MEMENTOR
          </p>
          <div>
            <h1 className="mt-16 max-w-md font-heading text-4xl leading-tight font-bold tracking-tight text-slate-700 ">
              Learn with more structure.
            </h1>
            <p className="mt-5 max-w-sm text-base leading-7 text-muted-foreground">
              Keep your library, progress, and notes organized in one place.
            </p>
          </div>
        </aside>

        <div className="p-6 sm:p-12 lg:flex lg:flex-col lg:justify-center lg:p-16">
          <p className="mb-8 font-heading text-5xl leading-none font-bold tracking-tighter text-foreground sm:text-6xl lg:hidden">
            MEMENTOR
          </p>

          <header className="mb-8">
            <h2 className="font-heading text-3xl leading-none font-bold tracking-tight text-heading-muted sm:text-4xl">
              Welcome back
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Enter your account details to sign in.
            </p>
          </header>

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
                <a href="#" className="text-link">
                  Forgot password?
                </a>
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
              <label
                htmlFor="remember"
                className="text-sm text-muted-foreground"
              >
                Remember me on this device
              </label>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-xl border-0 bg-muted-foreground px-4 py-3 text-sm font-bold text-white transition hover:bg-foreground focus-visible:shadow-[0_0_0_4px_oklch(78.5%_0.02_155_/_0.45)] focus-visible:outline-none active:translate-y-px"
            >
              Sign in
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a href="#" className="text-link">
              Create one
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
