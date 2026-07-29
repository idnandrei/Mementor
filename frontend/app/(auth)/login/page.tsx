import type { Metadata } from "next";

import { AuthShell } from "@/app/components/auth-shell";
import { LoginForm } from "@/app/components/login-form";

export const metadata: Metadata = {
  title: "Login | Mementor",
  description: "Sign in to your Mementor account.",
};

export default function Home() {
  return (
    <AuthShell>
      <LoginForm />
    </AuthShell>
  );
}
