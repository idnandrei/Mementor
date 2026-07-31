import { Bell, Search, Upload } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { SidebarTrigger } from "@/app/components/ui/sidebar";

export function AppHeader() {
  return (
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
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell />
        </Button>
        <Button className="hidden sm:inline-flex">
          <Upload data-icon="inline-start" />
          Upload
        </Button>
      </div>
    </header>
  );
}
