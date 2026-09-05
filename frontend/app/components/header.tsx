"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, LogOut, Menu, Settings, UserRound, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { SiteLogo } from "@/app/components/logo";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Skeleton } from "@/app/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/lib/utils/string";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Use cases", href: "/#use-cases" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const {
    user,
    isAuthenticated,
    isLoading,
    logout,
    isLoggingOut,
  } = useAuth();

  const initials = user ? getInitials(user.username) : undefined;

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <SiteLogo />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden min-w-56 items-center justify-end gap-2 md:flex">
          {isLoading ? (
            <>
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="h-9 w-28 rounded-full" />
            </>
          ) : isAuthenticated && user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger
                  aria-label={`Open account menu for ${user.username}`}
                  render={
                    <Button variant="ghost" className="gap-2 px-2" />
                  }
                >
                  <Avatar size="sm">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="max-w-28 truncate">{user.username}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={8} className="w-64">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>
                      <span className="flex items-center gap-3">
                        <Avatar size="lg">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="min-w-0">
                          <span className="block truncate font-medium text-foreground">
                            {user.username}
                          </span>
                          <span className="block truncate font-normal">
                            {user.email}
                          </span>
                        </span>
                      </span>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserRound />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings />
                    Account settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    disabled={isLoggingOut}
                    onClick={() => logout({})}
                  >
                    <LogOut />
                    {isLoggingOut ? "Signing out…" : "Sign out"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="lg" nativeButton={false} render={<Link href="/home" />}>
                Go to workspace
                <ArrowRight data-icon="inline-end" />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="lg"
                nativeButton={false}
                render={<Link href="/login" />}
              >
                Sign in
              </Button>
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href="/register" />}
              >
                Get started
              </Button>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open && (
        <div className="border-t border-border/70 bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            {!isLoading && (
              <div className="mt-2 flex flex-col gap-2">
                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center gap-3 rounded-xl bg-muted/60 px-3 py-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{user.username}</p>
                        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Button nativeButton={false} render={<Link href="/home" />}>
                      Go to workspace
                      <ArrowRight data-icon="inline-end" />
                    </Button>
                    <Button
                      variant="outline"
                      disabled={isLoggingOut}
                      onClick={() => logout({})}
                    >
                      <LogOut data-icon="inline-start" />
                      {isLoggingOut ? "Signing out…" : "Sign out"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      nativeButton={false}
                      render={<Link href="/login" />}
                    >
                      Sign in
                    </Button>
                    <Button nativeButton={false} render={<Link href="/register" />}>
                      Get started
                    </Button>
                  </>
                )}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
