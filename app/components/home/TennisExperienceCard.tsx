"use client";

import { motion } from "framer-motion";

export default function TennisExperienceCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className="group relative overflow-hidden rounded-lg border border-[#E5E5E5] bg-white p-6 md:p-8"
    >
      <div className="mb-4">
        <span className="font-serif text-4xl font-bold text-[#bcff4f] md:text-5xl">
          10+
        </span>
      </div>
      <p className="text-sm font-medium uppercase tracking-wider text-[#bcff4f]">
        Years in
      </p>
      <p className="text-sm font-medium uppercase tracking-wider text-[#bcff4f]">
        Tennis Industry
      </p>
    </motion.div>
  );
}
