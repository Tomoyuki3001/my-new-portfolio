"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import AboutMeCard from "./AboutMeCard";
import IntroductionCard from "./IntroductionCard";

export default function BentoGrid() {
  return (
    <section id="work" className="mx-auto max-w-[1100px] px-4 pb-24 sm:px-8 md:px-12 lg:px-20 xl:px-24">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <IntroductionCard />
        <ProjectCard />
        <AboutMeCard delay={0.2} />
      </div>
    </section>
  );
}
