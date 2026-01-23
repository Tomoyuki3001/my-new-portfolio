"use client";

import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <section className="mx-auto max-w-[1100px] px-12 py-16 md:px-20 md:py-24 lg:px-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8 font-serif text-4xl font-bold leading-tight tracking-tight text-[#1a1a1a] md:text-5xl lg:text-6xl"
      >
        Get In Touch
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="max-w-2xl text-lg leading-relaxed text-[#666] md:text-xl"
      >
        Whether you&apos;re looking to collaborate on a project, discuss tennis
        strategies, or just want to connect, I&apos;d love to hear from you.
      </motion.p>
    </section>
  );
}
