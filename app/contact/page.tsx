import PageLayout from "../components/layout/PageLayout";
import ContactHero from "../components/contact/ContactHero";
import ContactContent from "../components/contact/ContactContent";

export default function Contact() {
  return (
    <PageLayout>
      <ContactHero />
      <ContactContent />
    </PageLayout>
  );
}
