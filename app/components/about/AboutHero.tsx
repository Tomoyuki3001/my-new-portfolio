"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16 md:px-8 md:py-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8 font-serif text-5xl font-bold leading-tight tracking-tight text-[#1a1a1a] md:text-6xl lg:text-7xl"
      >
        About Me
      </motion.h1>
    </section>
  );
}
