"use client";

import {
  ArrowLeft,
  Captions,
  Check,
  ChevronDown,
  Menu,
  MessageSquare,
  Pin,
  PinOff,
  Plus,
  Send,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/app/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import type { Lecture } from "@/lib/demo-library";

const conversations = [
  { id: "key-ideas", title: "Key ideas from the lecture", time: "Just now" },
  { id: "study-guide", title: "Create a study guide", time: "Yesterday" },
  { id: "practice", title: "Practice questions", time: "Jul 28" },
];

function ConversationList({
  active,
  collapsed = false,
  onSelect,
}: {
  active: string;
  collapsed?: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className={collapsed ? "p-2" : "p-3"}>
        <Button
          className={collapsed ? "w-full px-0" : "w-full justify-start"}
          variant="outline"
          title={collapsed ? "New conversation" : undefined}
          aria-label={collapsed ? "New conversation" : undefined}
        >
          <Plus /> {!collapsed && "New conversation"}
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-4">
        {!collapsed && <p className="px-2 py-2 text-xs font-medium text-muted-foreground">Conversations</p>}
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelect(conversation.id)}
            title={collapsed ? conversation.title : undefined}
            aria-label={collapsed ? conversation.title : undefined}
            className={`mb-1 flex w-full rounded-2xl transition-colors ${collapsed ? "h-10 items-center justify-center p-0" : "px-3 py-3 text-left"} ${active === conversation.id ? "bg-accent" : "hover:bg-accent/60"}`}
          >
            {collapsed ? (
              <MessageSquare className="size-4" />
            ) : (
              <span>
                <span className="line-clamp-2 text-sm font-medium leading-snug">{conversation.title}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{conversation.time}</span>
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function LectureWorkspace({ lecture }: { lecture: Lecture }) {
  const [activeConversation, setActiveConversation] = useState("key-ideas");
  const [isConversationDrawerOpen, setIsConversationDrawerOpen] = useState(false);
  const [isConversationPanelPinned, setIsConversationPanelPinned] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [sentPrompt, setSentPrompt] = useState<string | null>(null);

  function sendPrompt() {
    const value = prompt.trim();
    if (!value) return;
    setSentPrompt(value);
    setPrompt("");
  }

  return (
    <div className="flex min-h-[calc(100svh-4rem)] flex-1 overflow-hidden">
      {isConversationPanelPinned && (
        <aside className="hidden w-56 shrink-0 flex-col border-r bg-muted/20 lg:flex">
          <div className="flex h-14 items-center justify-between border-b px-4">
            <span className="text-sm font-semibold">Conversations</span>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsConversationPanelPinned(false)}
              aria-label="Unpin conversations"
              title="Unpin conversations"
            >
              <PinOff />
            </Button>
          </div>
          <ConversationList active={activeConversation} onSelect={setActiveConversation} />
        </aside>
      )}

      <main className="relative flex min-w-0 flex-1 flex-col">
        <header className="flex min-h-14 items-center gap-3 border-b px-4 sm:px-6">
          <Button
            variant="ghost"
            size="icon-sm"
            nativeButton={false}
            render={<Link href="/library" />}
            aria-label="Back to library"
          >
            <ArrowLeft />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-sm font-semibold">{lecture.title}</h1>
            <p className="truncate text-xs text-muted-foreground">{lecture.course} · {lecture.duration}</p>
          </div>
          <Sheet open={isConversationDrawerOpen} onOpenChange={setIsConversationDrawerOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="outline"
                    size="sm"
                    className={isConversationPanelPinned ? "lg:hidden" : undefined}
                  />
                }
              >
                <Menu /> Conversations
                <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] leading-none text-muted-foreground">{conversations.length}</span>
              </SheetTrigger>
              <SheetContent side="right" className="w-[20rem] p-0 sm:max-w-[22rem]">
                <SheetHeader className="border-b pr-14">
                  <SheetTitle>Conversations</SheetTitle>
                  <SheetDescription>Choose or start a conversation about this lecture.</SheetDescription>
                </SheetHeader>
                <div className="hidden border-b p-3 lg:block">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      setIsConversationPanelPinned(true);
                      setIsConversationDrawerOpen(false);
                    }}
                  >
                    <Pin /> Pin beside workspace
                  </Button>
                </div>
                <ConversationList
                  active={activeConversation}
                  onSelect={(id) => {
                    setActiveConversation(id);
                    setIsConversationDrawerOpen(false);
                  }}
                />
              </SheetContent>
            </Sheet>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-4xl px-4 pt-6 pb-44 sm:px-8 sm:pt-8">
            <div className={`relative aspect-video overflow-hidden rounded-3xl bg-gradient-to-br ${lecture.accent} shadow-lg`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,.35),transparent_28%),linear-gradient(120deg,transparent_45%,rgba(255,255,255,.12)_45%,rgba(255,255,255,.12)_46%,transparent_46%)]" />
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent px-5 pt-16 pb-5 text-white">
                <span className="flex size-10 items-center justify-center rounded-full bg-white text-slate-950"><ChevronDown className="size-5 -rotate-90" /></span>
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/30"><div className="h-full w-[28%] bg-white" /></div>
                <span className="text-xs font-medium">13:18 / {lecture.duration}</span>
                <Captions className="size-5" />
              </div>
            </div>

            <div className="mx-auto mt-10 max-w-2xl">
              <div className="mb-8 flex gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Sparkles className="size-4" /></span>
                <div>
                  <p className="text-sm leading-6">
                    I’ve indexed this lecture and its transcript. Ask about a concept, request a summary, or turn any section into practice questions.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Summarize the key ideas", "Create a study guide", "Quiz me on this lecture"].map((suggestion) => (
                      <button key={suggestion} onClick={() => setPrompt(suggestion)} className="rounded-full border bg-background px-3 py-2 text-xs font-medium transition-colors hover:bg-muted">
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {sentPrompt && (
                <div className="ml-auto max-w-[85%] rounded-3xl rounded-br-lg bg-primary px-4 py-3 text-sm text-primary-foreground">
                  {sentPrompt}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/95 to-transparent px-4 pt-10 pb-5 sm:px-8">
          <div className="pointer-events-auto mx-auto max-w-2xl">
            <div className="flex items-end gap-2 rounded-[1.6rem] border bg-background p-2 pl-4 shadow-xl shadow-foreground/5">
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendPrompt(); }
                }}
                rows={1}
                placeholder="Ask anything about this lecture…"
                className="max-h-32 min-h-10 flex-1 resize-none bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <Button size="icon-lg" onClick={sendPrompt} disabled={!prompt.trim()} aria-label="Send message"><Send /></Button>
            </div>
            <p className="mt-2 flex items-center justify-center gap-1 text-[11px] text-muted-foreground"><Check className="size-3" />Answers use this lecture and its transcript</p>
          </div>
        </div>
      </main>
    </div>
  );
}
