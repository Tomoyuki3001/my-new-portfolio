"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageHeroProps {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  description?: string | ReactNode;
  className?: string;
}

export default function PageHero({ title, subtitle, description, className = "" }: PageHeroProps) {
  return (
    <section className={`mx-auto max-w-[1100px] px-4 py-12 sm:px-8 sm:py-16 md:px-12 md:py-8 lg:px-20 xl:px-24 ${className}`}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-2 font-serif text-2xl font-bold leading-tight tracking-tight text-[#1a1a1a] sm:text-3xl md:text-3xl lg:text-4xl"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mb-2 text-base text-[#1a1a1a] sm:text-lg md:text-xl"
        >
          {subtitle}
        </motion.p>
      )}
      {description && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base md:text-lg"
        >
          {description}
        </motion.div>
      )}
    </section>
  );
}
