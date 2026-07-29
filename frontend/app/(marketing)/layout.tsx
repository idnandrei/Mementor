import { SiteFooter } from "@/app/components/footer";
import { SiteHeader } from "@/app/components/header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="flex-1">{children}</main>

      <SiteFooter />
    </div>
  );
}
