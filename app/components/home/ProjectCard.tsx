"use client";

import { motion } from "framer-motion";

export default function ProjectCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-lg border border-[#E5E5E5] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] md:col-span-2 lg:col-span-2"
    >
      <div className="relative h-full min-h-[400px] p-8 md:p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/40"></div>
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            <h2 className="mb-4 font-serif text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              VANCOUVER
              <br />
              TENNIS GUIDE
            </h2>
          </div>
          <button className="w-fit rounded-full bg-[#bcff4f] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#1a1a1a] transition-all hover:bg-[#bcff4f]/90">
            View Project
          </button>
        </div>
      </div>
    </motion.div>
  );
}
