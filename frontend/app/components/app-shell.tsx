"use client";

import {
  Bell,
  ChevronUp,
  Clock3,
  GraduationCap,
  Library,
  LogOut,
  Search,
  Settings,
  Sparkles,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";

const mainNavigation = [
  {
    label: "Library",
    href: "/library",
    icon: Library,
  },
  {
    label: "Recent",
    href: "/library#recent",
    icon: Clock3,
  },
  {
    label: "Processing",
    href: "/library#processing",
    icon: Sparkles,
    badge: "1",
  },
];

const collections = [
  { label: "Machine Learning", color: "bg-cyan-500" },
  { label: "Deep Learning", color: "bg-violet-500" },
  { label: "Statistics", color: "bg-amber-500" },
];

function getInitials(username?: string) {
  if (!username) {
    return "ME";
  }

  return username.slice(0, 2).toUpperCase();
}

export function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
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
    return (
      <div className="grid min-h-dvh grid-cols-[16rem_1fr] bg-background">
        <aside className="hidden border-r bg-sidebar p-4 md:block">
          <Skeleton className="h-10 w-36" />
          <div className="mt-10 space-y-3">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        </aside>
        <main className="p-8">
          <Skeleton className="h-9 w-52" />
          <Skeleton className="mt-8 h-48 w-full rounded-4xl" />
        </main>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="px-3 py-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                tooltip="Mementor"
                render={<Link href="/library" />}
                className="hover:bg-transparent active:bg-transparent"
              >
                <span className="flex size-9 items-center justify-center rounded-2xl bg-sidebar-primary text-sidebar-primary-foreground">
                  <GraduationCap className="size-5" />
                </span>
                <span className="font-heading text-base font-semibold tracking-tight">
                  Mementor
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainNavigation.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      tooltip={item.label}
                      isActive={
                        item.href === "/library" && pathname === "/library"
                      }
                      render={<Link href={item.href} />}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Collections</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {collections.map((collection) => (
                  <SidebarMenuItem key={collection.label}>
                    <SidebarMenuButton tooltip={collection.label}>
                      <span
                        className={`size-2.5 rounded-full ${collection.color}`}
                      />
                      <span>{collection.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="w-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
                >
                  <div className="flex h-14 items-center gap-3 px-2 text-left group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
                    <Avatar size="lg">
                      <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                        {getInitials(user?.username)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
                      <p className="truncate text-sm font-medium">
                        {user?.username}
                      </p>
                      <p className="truncate text-xs text-sidebar-foreground/60">
                        {user?.email}
                      </p>
                    </div>
                    <ChevronUp className="size-4 group-data-[collapsible=icon]:hidden" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="start">
                  <DropdownMenuLabel>
                    <span className="block font-medium text-foreground">
                      {user?.username}
                    </span>
                    <span className="block truncate">{user?.email}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings />
                    Account settings
                  </DropdownMenuItem>
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
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur sm:px-6">
          <SidebarTrigger />

          <div className="relative hidden w-full max-w-md sm:block">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search your library…"
              className="bg-muted/60 pl-9"
              aria-label="Search your library"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
            >
              <Bell />
            </Button>
            <Button className="hidden sm:inline-flex">
              <Upload data-icon="inline-start" />
              Upload
            </Button>
          </div>
        </header>

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
