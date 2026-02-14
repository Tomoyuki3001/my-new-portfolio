"use client";

import { motion } from "framer-motion";
import PageHero from "../PageHero";

const titleWords = ["Hello,", "I'm", "Tomo"];
const subtitleWords = ["from the court", "to the code"];
const descLine1 = ["A", "tennis", "lover", "turned", "software", "engineer,"];
const descLine2 = [
  "bringing",
  "passion",
  "and",
  "precision",
  "to",
  "make",
  "positive",
  "impact",
  "on",
  "the",
  "tennis",
  "industry",
  "for",
  "future",
  "generations.",
];

function AnimatedTitle() {
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-1">
      {titleWords.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: i * 0.14,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function AnimatedSubtitle() {
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-2">
      {subtitleWords.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.35 + i * 0.12,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

const motionWord = {
  initial: { opacity: 0, y: 12 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: 0.55 + i * 0.04,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

function AnimatedDescription() {
  return (
    <p className="opacity-70 mx-auto max-w-[1100px] px-4 pb-12 sm:px-8 sm:pb-16 md:px-12 lg:px-20 xl:px-24">
      <span className="inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-0">
        {descLine1.map((word, i) => (
          <motion.span
            key={`1-${i}`}
            initial={motionWord.initial}
            animate={motionWord.animate(i)}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </span>
      <br />
      <span className="inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-0">
        {descLine2.map((word, i) => (
          <motion.span
            key={`2-${i}`}
            initial={motionWord.initial}
            animate={motionWord.animate(descLine1.length + i)}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </span>
    </p>
  );
}

export default function HeroSection() {
  return (
    <>
      <PageHero
        title={<AnimatedTitle />}
        subtitle={<AnimatedSubtitle />}
        className="md:py-16 lg:px-24"
      />
      <AnimatedDescription />
    </>
  );
}
