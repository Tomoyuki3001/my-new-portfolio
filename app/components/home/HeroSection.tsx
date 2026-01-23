import PageHero from "../PageHero";

export default function HeroSection() {
  return (
    <PageHero
      title={
        <>
          Hello, I'm Tomo
        </>
      }
      subtitle="from the court to the code"
      className="md:py-16 lg:px-24"
    />
  );
}
