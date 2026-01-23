"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="mx-auto max-w-[1100px] px-12 py-16 md:px-20 md:py-24 lg:px-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8 font-serif text-4xl font-bold leading-tight tracking-tight text-[#1a1a1a] md:text-5xl lg:text-6xl"
      >
        About Me
      </motion.h1>
    </section>
  );
}
