"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Vancouver from "@/public/vancouver.jpg";

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
      className="group relative overflow-hidden rounded-lg border border-[#E5E5E5] bg-white"
    >
      <div className="relative h-full min-h-[400px] p-8 md:p-12">
        <div className="absolute inset-0">
          <Image
            src={Vancouver}
            alt="Tennis court background"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/50 to-black/60"></div>
        </div>
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            <h2 className="mb-4 font-serif text-2xl font-bold text-white md:text-2xl lg:text-3xl">
              My Life
            </h2>
          </div>
          <button className="w-fit rounded-full bg-[#bcff4f] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#1a1a1a] transition-all hover:bg-[#bcff4f]/90">
            <a href="/about">
              About Me
            </a>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
