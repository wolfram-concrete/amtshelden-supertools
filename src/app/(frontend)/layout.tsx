import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

/**
 * Frontend Route Group Layout — gilt für alle öffentlichen Seiten.
 * Architektur: src/app/(frontend)/...
 */
export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
