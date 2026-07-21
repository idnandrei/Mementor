import type { Metadata } from "next";

import { AuthShell } from "../../_components/auth-shell";
import { LoginForm } from "../../_components/login-form";

export const metadata: Metadata = {
  title: "Login | Mementor",
  description: "Sign in to your Mementor account.",
};

export default function LoginPage() {
  return (
    <AuthShell>
      <LoginForm />
    </AuthShell>
  );
}
