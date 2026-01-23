"use client";

import { motion } from "framer-motion";

export default function ContactForm() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-lg border border-[#E5E5E5] bg-white p-8"
    >
      <h2 className="mb-6 font-serif text-3xl font-semibold text-[#1a1a1a]">
        Send a Message
      </h2>
      <form className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-[#666]"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full rounded-lg border border-[#E5E5E5] bg-[#F9F9F9] px-4 py-3 text-[#1a1a1a] transition-colors focus:border-[#3B82F6] focus:outline-none"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-[#666]"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-lg border border-[#E5E5E5] bg-[#F9F9F9] px-4 py-3 text-[#1a1a1a] transition-colors focus:border-[#3B82F6] focus:outline-none"
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-[#666]"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            className="w-full rounded-lg border border-[#E5E5E5] bg-[#F9F9F9] px-4 py-3 text-[#1a1a1a] transition-colors focus:border-[#3B82F6] focus:outline-none"
            placeholder="Your message..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-[#3B82F6] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-[#2563EB]"
        >
          Send Message
        </button>
      </form>
    </motion.div>
  );
}
