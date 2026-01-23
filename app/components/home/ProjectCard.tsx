"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import tennisCourtBg from "@/public/tennis-court-bg.png";

export default function ProjectCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-lg border border-[#E5E5E5]"
    >
      <div className="relative h-full min-h-[300px] p-6 sm:min-h-[400px] sm:p-8 md:p-12">
        <div className="absolute inset-0">
          <Image
            src={tennisCourtBg}
            alt="Tennis court background"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/10"></div>
        </div>
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            <h2 className="mb-4 font-serif text-xl font-bold text-white sm:text-2xl md:text-2xl lg:text-3xl">
              VANCOUVER
              <br />
              TENNIS GUIDE
            </h2>
          </div>
          <button className="w-fit rounded-full bg-[#bcff4f] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#1a1a1a] transition-all hover:bg-[#bcff4f]/90 sm:px-6 sm:py-3 sm:text-sm">
            <a href="https://vancouver-tennis.vercel.app/" target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
