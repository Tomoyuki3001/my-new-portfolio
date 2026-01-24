import PageLayout from "./components/layout/PageLayout";
import HeroSection from "./components/home/HeroSection";
import BentoGrid from "./components/home/BentoGrid";
import RecentActivitySection from "./components/home/RecentActivitySection";

export default function Home() {
  return (
    <PageLayout>
      <HeroSection />
      <BentoGrid />
      <RecentActivitySection />
    </PageLayout>
  );
}
