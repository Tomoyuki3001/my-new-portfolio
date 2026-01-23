"use client";

import { motion } from "framer-motion";

export default function AboutBio() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-6"
    >
      <p className="text-lg leading-relaxed text-[#666] md:text-xl">
        I&apos;m a creative developer who brings the same discipline and
        strategic thinking from the tennis court to every line of code I write.
      </p>
      <p className="text-lg leading-relaxed text-[#666] md:text-xl">
        With over 10 years of experience in the tennis industry, I&apos;ve
        learned that success comes from precision, practice, and
        perseverance—values that translate seamlessly into web development.
      </p>
      <p className="text-lg leading-relaxed text-[#666] md:text-xl">
        When I&apos;m not coding, you&apos;ll find me on the court, perfecting
        my serve and analyzing game strategies. The same attention to detail I
        apply to my tennis game, I bring to building elegant digital experiences.
      </p>
    </motion.div>
  );
}
