"use client";

import { motion } from "framer-motion";
import AboutBio from "./AboutBio";
import AboutStats from "./AboutStats";

export default function AboutContent() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-24 md:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <AboutBio />
        <AboutStats />
      </div>
    </section>
  );
}
