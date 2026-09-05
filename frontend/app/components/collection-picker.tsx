import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";

import { Input } from "@/app/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { cn } from "@/lib/utils";

export type SelectedCollection = {
  id: string;
  label: string;
  color: string;
};

type CollectionPickerProps = {
  collections: SelectedCollection[];
  value: SelectedCollection[];
  onChange: (collections: SelectedCollection[]) => void;
};

export function CollectionPicker({
  collections,
  value,
  onChange,
}: CollectionPickerProps) {
  const [query, setQuery] = useState("");

  const filteredCollections = collections.filter((collection) =>
    collection.label
      .toLocaleLowerCase()
      .includes(query.trim().toLocaleLowerCase()),
  );

  function toggleCollection(collection: SelectedCollection) {
    const selected = value.some((item) => item.id === collection.id);
    onChange(
      selected
        ? value.filter((item) => item.id !== collection.id)
        : [...value, collection],
    );
  }

  return (
    <div className="space-y-2.5">
      <Popover>
        <PopoverTrigger
          render={
            <button
              type="button"
              className="flex h-10 w-full items-center justify-between rounded-3xl border border-transparent bg-input/50 px-3 text-left text-sm outline-none transition-[color,box-shadow,background-color] hover:bg-input focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
            />
          }
        >
          <span className="text-muted-foreground">
            {value.length ? `${value.length} selected` : "Select collections"}
          </span>
          <ChevronDown
            className="size-4 text-muted-foreground"
            aria-hidden="true"
          />
        </PopoverTrigger>
        <PopoverContent className="space-y-2 p-2.5">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search collections"
            aria-label="Search collections"
          />
          <div className="space-y-1">
            {filteredCollections.map((collection) => {
              const selected = value.some((item) => item.id === collection.id);
              return (
                <button
                  key={collection.id}
                  type="button"
                  onClick={() => toggleCollection(collection)}
                  className="flex w-full items-center gap-2.5 rounded-2xl px-2.5 py-2 text-left text-sm font-medium outline-none hover:bg-accent focus-visible:bg-accent"
                >
                  <span
                    className={cn("size-3 rounded-full", collection.color)}
                  />
                  <span>{collection.label}</span>
                  <span className="ml-auto flex size-5 items-center justify-center rounded-md border">
                    {selected && <Check className="size-3.5" />}
                  </span>
                </button>
              );
            })}
            {filteredCollections.length === 0 && (
              <p className="px-2.5 py-3 text-sm text-muted-foreground">
                No matching collections.
              </p>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2" aria-label="Selected collections">
          {value.map((collection) => (
            <span
              key={collection.id}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm",
                collection.color,
                collection.color === "bg-amber-500" && "text-amber-950",
              )}
            >
              {collection.label}
              <button
                type="button"
                onClick={() => toggleCollection(collection)}
                className="rounded-full p-0.5 opacity-75 outline-none hover:bg-black/10 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-white"
                aria-label={`Remove ${collection.label}`}
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
