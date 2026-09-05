"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { AppHeader } from "@/app/components/app-header";
import { AppShellLoading } from "@/app/components/app-shell-loading";
import { AppSidebar } from "@/app/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/app/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";

export function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    isLoading,
    logout,
    isLoggingOut,
  } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <AppShellLoading />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar
        user={user}
        isLoggingOut={isLoggingOut}
        onLogoutAction={() => logout({})}
      />

      <SidebarInset>
        <AppHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
