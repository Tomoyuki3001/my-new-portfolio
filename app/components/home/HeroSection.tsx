import PageHero from "../PageHero";

export default function HeroSection() {
  return (
    <PageHero
      title={
        <>
          FROM THE COURT
          <br />
          TO THE CODE
        </>
      }
      subtitle="A tennis lover turned software developer, bringing passion and precision to make positive impact on the tennis industy for future generations"
      className="md:py-16 lg:px-24"
    />
  );
}
