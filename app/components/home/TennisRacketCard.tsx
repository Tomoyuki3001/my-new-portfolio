"use client";

import { motion } from "framer-motion";

interface TennisRacketCardProps {
  delay?: number;
}

export default function TennisRacketCard({ delay = 0.2 }: TennisRacketCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className="group relative overflow-hidden rounded-lg border border-[#E5E5E5] bg-white p-6 md:p-8"
    >
      <div className="flex h-full items-center justify-center">
        <svg
          viewBox="0 0 100 120"
          className="h-24 w-24 text-[#bcff4f]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <ellipse cx="50" cy="60" rx="35" ry="45" />
          <line x1="50" y1="15" x2="50" y2="105" />
          <line x1="30" y1="40" x2="70" y2="40" />
          <line x1="30" y1="80" x2="70" y2="80" />
          <circle cx="50" cy="60" r="8" fill="currentColor" />
        </svg>
      </div>
    </motion.div>
  );
}
