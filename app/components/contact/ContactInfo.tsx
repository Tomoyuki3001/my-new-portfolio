"use client";

import { motion } from "framer-motion";

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      className="space-y-6"
    >
      <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
        <h3 className="mb-4 font-serif text-2xl font-semibold text-[#1a1a1a]">
          Contact Information
        </h3>
        <div className="space-y-4">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[#666]">
              Email
            </p>
            <a
              href="mailto:contact@example.com"
              className="text-[#1a1a1a] transition-colors hover:text-[#3B82F6]"
            >
              contact@example.com
            </a>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[#666]">
              Location
            </p>
            <p className="text-[#1a1a1a]">Vancouver, BC, Canada</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
        <h3 className="mb-4 font-serif text-2xl font-semibold text-[#1a1a1a]">
          Social Links
        </h3>
        <div className="flex flex-col gap-3">
          <a
            href="#"
            className="text-[#666] transition-colors hover:text-[#3B82F6]"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="text-[#666] transition-colors hover:text-[#3B82F6]"
          >
            GitHub
          </a>
          <a
            href="#"
            className="text-[#666] transition-colors hover:text-[#3B82F6]"
          >
            Twitter
          </a>
        </div>
      </div>

      <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
        <h3 className="mb-4 font-serif text-2xl font-semibold text-[#1a1a1a]">
          Availability
        </h3>
        <p className="text-[#666] leading-relaxed">
          I&apos;m currently available for freelance projects and collaborations.
          Feel free to reach out if you have an interesting project in mind or
          just want to chat about tennis and code!
        </p>
      </div>
    </motion.div>
  );
}
