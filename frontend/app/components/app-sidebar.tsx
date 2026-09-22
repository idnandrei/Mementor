"use client";

import {
  BadgeQuestionMark,
  ChevronsUpDown,
  Clock3,
  CreditCard,
  GraduationCap,
  House,
  Library,
  LogOut,
  Settings,
  Sparkles,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/app/components/ui/sidebar";
import {
  getCollectionsOptions,
  getVideosOptions,
} from "@/generated/api/@tanstack/react-query.gen";
import type { UserResponse } from "@/generated/api/types.gen";
import { getInitials } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const mainNavigation = [
  {
    label: "Home",
    href: "/home",
    icon: House,
  },
  {
    label: "Library",
    href: "/library",
    icon: Library,
  },
  {
    label: "Recent",
    href: "/home#recent",
    icon: Clock3,
  },
  {
    label: "Processing",
    href: "/home#processing",
    icon: Sparkles,
  },
];

type AppSidebarProps = {
  user: UserResponse;
  isLoggingOut: boolean;
  onLogoutAction: () => void;
};

export function AppSidebar({
  user,
  isLoggingOut,
  onLogoutAction,
}: AppSidebarProps) {
  const pathname = usePathname();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const collectionsQuery = useQuery(getCollectionsOptions());
  const videosQuery = useQuery(getVideosOptions());
  const pendingVideoCount =
    videosQuery.data?.filter((video) => video.status === "pending_upload")
      .length ?? 0;
  const availableCollections =
    collectionsQuery.data?.map((collection) => ({
      id: collection.id,
      label: collection.name,
      color: "bg-cyan-500",
    })) ?? [];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="Mementor"
              render={<Link href="/home" />}
              className="hover:bg-transparent active:bg-transparent group-data-[collapsible=icon]:justify-center"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground group-data-[collapsible=icon]:size-8">
                <GraduationCap className="size-5" />
              </span>
              <span className="font-heading text-base font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
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
                    className="group-data-[collapsible=icon]:justify-center"
                    isActive={
                      item.href === pathname ||
                      (item.href === "/library" &&
                        pathname.startsWith("/library/"))
                    }
                    render={<Link href={item.href} />}
                  >
                    <item.icon />
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.label}
                    </span>
                  </SidebarMenuButton>
                  {item.label === "Processing" && pendingVideoCount > 0 && (
                    <SidebarMenuBadge>{pendingVideoCount}</SidebarMenuBadge>
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
              {availableCollections.map((collection) => (
                <SidebarMenuItem key={collection.label}>
                  <SidebarMenuButton
                    tooltip={collection.label}
                    className="group-data-[collapsible=icon]:justify-center"
                    isActive={pathname === `/collections/${collection.id}`}
                    render={<Link href={`/collections/${collection.id}`} />}
                  >
                    <span
                      className={`size-2.5 shrink-0 rounded-full ${collection.color}`}
                    />
                    <span className="group-data-[collapsible=icon]:hidden">
                      {collection.label}
                    </span>
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
            <DropdownMenu
              open={isAccountMenuOpen}
              onOpenChange={setIsAccountMenuOpen}
            >
              <DropdownMenuTrigger
                aria-label={`Open account menu for ${user.username}`}
                render={
                  <SidebarMenuButton
                    size="lg"
                    tooltip="Account menu"
                    className="group-data-[collapsible=icon]:justify-center"
                  />
                }
              >
                <Avatar>
                  <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                    {getInitials(user.username)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
                  <p className="truncate text-sm font-medium">
                    {user.username}
                  </p>
                  <p className="truncate text-xs text-sidebar-foreground/60">
                    {user.email}
                  </p>
                </div>
                <ChevronsUpDown className="size-4 text-sidebar-foreground/55 group-data-[collapsible=icon]:hidden" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                sideOffset={8}
                className="w-64"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <span className="flex items-center gap-3">
                      <Avatar size="lg">
                        <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                          {getInitials(user.username)}
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
                <DropdownMenuItem>
                  <CreditCard />
                  Plan & billing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <BadgeQuestionMark />
                  Help & support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  disabled={isLoggingOut}
                  onClick={onLogoutAction}
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
  );
}
