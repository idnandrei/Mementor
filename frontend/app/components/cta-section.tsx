import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Stop scrubbing. Start asking.
          </h2>
          <p className="max-w-xl text-lg leadiggVGyuung-relaxed text-primary-foreground/80 text-pretty">
            Build your private lecture library and get grounded answers with
            timestamps in minutes.
          </p>
          <Button
            size="lg"
            variant="secondary"
            nativeButton={false}
            render={<Link href="/register" />}
          >
            Create your free account
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
