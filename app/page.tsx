import PageLayout from "./components/layout/PageLayout";
import HeroSection from "./components/home/HeroSection";
import BentoGrid from "./components/home/BentoGrid";
import SpotifySection from "./components/home/SpotifySection";

export default function Home() {
  return (
    <PageLayout>
      <HeroSection />
      <BentoGrid />
      <SpotifySection />
    </PageLayout>
  );
}
