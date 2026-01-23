"use client";

import { motion } from "framer-motion";
import { Activity, Music, Dumbbell, Clapperboard } from "lucide-react";

interface HobbyCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  stats?: { label: string; value: string };
}

export default function HobbiesSection() {
  const hobbyCards: HobbyCard[] = [
    {
      icon: <Activity size={24} color="#1A1A1A" strokeWidth={1.5} />,
      title: "Tennis",
      description: "Watching ATP/WTA matches and went to Lavar Cup in 2023",
    },
    {
      icon: <Dumbbell size={24} color="#1A1A1A" strokeWidth={1.5} />,
      title: "Workout",
      description: "My goal is to lift 100kg in bench press and stay healthy",
    },
    {
      icon: <Clapperboard size={24} color="#1A1A1A" strokeWidth={1.5} />,
      title: "Netflix",
      description: "Selling Sunset and Emily in Paris are my favorite shows",
    },
    {
      icon: <Music size={24} color="#1A1A1A" strokeWidth={1.5} />,
      title: "Podcasts",
      description: "Call Her Daddy is the best podcast and my English material",
    },
  ];

  return (
    <div className="mt-24 flex gap-16">
      {/* Left Column - Hobbies Title */}
      <div className="shrink-0">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-serif text-2xl font-bold text-[#1a1a1a] md:text-3xl"
        >
          Hobbies
        </motion.h2>
      </div>

      {/* Right Column - Hobbies Grid */}
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {hobbyCards.map((hobby, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 + index * 0.1 }}
              className="flex flex-col gap-3 rounded-lg border border-[#E5E5E5] bg-white p-6 transition-all hover:border-[#bcff4f]"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0">{hobby.icon}</div>
                <div className="flex-1">
                  <h3 className="mb-1 font-semibold text-[#1a1a1a]">{hobby.title}</h3>
                  <p className="text-sm text-[#666]">{hobby.description}</p>
                </div>
              </div>
              {hobby.stats && (
                <div className="mt-2 border-t border-[#E5E5E5] pt-3">
                  <span className="font-serif text-2xl font-bold text-[#bcff4f]">
                    {hobby.stats.value}
                  </span>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#bcff4f]">
                    {hobby.stats.label}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
