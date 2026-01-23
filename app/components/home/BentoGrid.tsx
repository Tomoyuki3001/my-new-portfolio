"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import TennisExperienceCard from "./TennisExperienceCard";
import TennisRacketCard from "./TennisRacketCard";
import BlogPostsCard from "./BlogPostsCard";

export default function BentoGrid() {
  return (
    <section id="work" className="mx-auto max-w-[1200px] px-6 pb-24 md:px-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ProjectCard />
        <TennisExperienceCard />
        <TennisRacketCard delay={0.2} />
        <TennisRacketCard delay={0.3} />
        <BlogPostsCard />
      </div>
    </section>
  );
}
