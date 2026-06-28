import { ChatWidget } from "@/components/site/ChatWidget";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

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
    <div className="flex min-h-screen flex-col bg-cream">
      <ScrollReveal />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
