"use client";

import { motion } from "framer-motion";

export default function AboutStats() {
  const skills = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Node.js",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      className="space-y-6"
    >
      <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
        <div className="mb-4">
          <span className="font-serif text-5xl font-bold text-[#bcff4f]">
            10+
          </span>
        </div>
        <p className="text-sm font-medium uppercase tracking-wider text-[#bcff4f]">
          Years in Tennis Industry
        </p>
      </div>

      <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
        <h3 className="mb-4 font-serif text-2xl font-semibold text-[#1a1a1a]">
          Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="rounded-full border border-[#E5E5E5] bg-[#F9F9F9] px-4 py-1.5 text-sm text-[#666]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
        <h3 className="mb-4 font-serif text-2xl font-semibold text-[#1a1a1a]">
          Philosophy
        </h3>
        <p className="text-[#666] leading-relaxed">
          Every project is like a match—it requires strategy, execution, and the
          ability to adapt. I approach development with the same mindset I bring
          to the court: focus, precision, and a commitment to excellence.
        </p>
      </div>
    </motion.div>
  );
}
