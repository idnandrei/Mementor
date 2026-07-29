import type { Metadata } from "next";

import { AuthShell } from "@/app/components/auth-shell";
import { RegisterForm } from "@/app/components/register-form";

export const metadata: Metadata = {
  title: "Register | Mementor",
  description: "Create your Mementor account.",
};

export default function RegisterPage() {
  return (
    <AuthShell>
      <RegisterForm />
    </AuthShell>
  );
}
