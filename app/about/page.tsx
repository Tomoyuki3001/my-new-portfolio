import PageLayout from "../components/layout/PageLayout";
import AboutHero from "../components/about/AboutHero";
import AboutContent from "../components/about/AboutContent";

export default function About() {
  return (
    <PageLayout>
      <AboutHero />
      <AboutContent />
    </PageLayout>
  );
}
