"use client";

import { motion } from "framer-motion";

export default function BlogPostsCard() {
  const blogPosts = [
    "Electrician Slemert",
    "Fine Intellect Interjections",
    "Tennis Strategy Insights",
    "Code & Court Balance",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
      className="group relative overflow-hidden rounded-lg border border-[#E5E5E5] bg-white p-6 md:col-span-2 lg:col-span-2 md:p-8"
    >
      <h3 className="mb-6 text-xs font-medium uppercase tracking-wider text-[#666]">
        Latest Blog Posts
      </h3>
      <div className="space-y-4">
        {blogPosts.map((post, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#bcff4f]"></div>
            <a
              href="#"
              className="text-sm text-[#1a1a1a] transition-colors hover:text-[#bcff4f]"
            >
              {post}
            </a>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
