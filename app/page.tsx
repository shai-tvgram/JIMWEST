import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { RadarSection } from "@/components/radar-section";
import { AegisSection } from "@/components/aegis-section";
import { AegisMobileSection } from "@/components/aegis-mobile-section";
import { AcademySection } from "@/components/academy-section";
import { PetroxSection } from "@/components/petrox-section";
import { TerminalSection } from "@/components/terminal-section";
import { AboutSection } from "@/components/about-section";
import { ApplicationSection } from "@/components/application-section";
import { TelegramFab } from "@/components/telegram-fab";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <TelegramFab />

      <HeroSection />

      <div className="border-t border-border/30">
        <RadarSection />
      </div>

      <div className="border-t border-border/30">
        <AegisSection />
      </div>

      <div className="border-t border-border/30">
        <AegisMobileSection />
      </div>

      <div className="border-t border-border/30">
        <AcademySection />
      </div>

      <div className="border-t border-border/30">
        <PetroxSection />
      </div>

      <div className="border-t border-border/30">
        <TerminalSection />
      </div>

      <div className="border-t border-border/30">
        <AboutSection />
      </div>

      <div className="border-t border-border/30">
        <ApplicationSection />
      </div>

      <Footer />
    </main>
  );
}
