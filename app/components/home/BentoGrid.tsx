"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import AboutMeCard from "./AboutMeCard";
import IntroductionCard from "./IntroductionCard";

export default function BentoGrid() {
  return (
    <section id="work" className="mx-auto max-w-[1100px] px-12 pb-24 md:px-20 lg:px-24">
      <div className="grid grid-cols-2 gap-4">
        <IntroductionCard />
        <ProjectCard />
        <AboutMeCard delay={0.2} />
      </div>
    </section>
  );
}
