"use client";

import { motion } from "framer-motion";

interface TimelineEntry {
  organization: string;
  role: string;
  description: string;
  period: string;
  color: string;
}

export default function AboutContent() {
  const timelineEntries: TimelineEntry[] = [
    {
      organization: "Software Developer",
      role: "Full-Stack Development",
      description: "Building elegant digital experiences with precision and passion",
      period: "2020 - Now",
      color: "bg-blue-500",
    },
    {
      organization: "Tennis Professional",
      role: "Competitive Player & Coach",
      description: "10+ years of experience bringing discipline and strategic thinking",
      period: "2014 - Now",
      color: "bg-[#bcff4f]",
    },
    {
      organization: "Education",
      role: "Computer Science & Web Development",
      description: "Self-taught developer with continuous learning in modern technologies",
      period: "2020 - Now",
      color: "bg-green-500",
    },
    {
      organization: "Projects",
      role: "Portfolio & Web Applications",
      description: "Creating innovative solutions combining tennis insights with code",
      period: "2020 - Now",
      color: "bg-red-500",
    },
  ];

  return (
    <section className="mx-auto max-w-[1100px] px-12 pb-24 md:px-20 lg:px-24">
      <div className="flex gap-16">
        {/* Left Column - Timeline Title */}
        <div className="flex-shrink-0">
          <h2 className="font-serif text-4xl font-bold text-[#1a1a1a] md:text-5xl">
            Timeline
          </h2>
        </div>

        {/* Right Column - Timeline */}
        <div className="flex-1">
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-0 top-0 h-full w-0.5 bg-[#E5E5E5]"></div>

            {/* Timeline Entries */}
            <div className="space-y-12">
              {timelineEntries.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                  className="relative flex items-start gap-6"
                >
                  {/* Colored Marker */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`h-4 w-4 rounded-full ${entry.color} border-2 border-white shadow-sm`}
                      style={{ marginLeft: "-8px" }}
                    ></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#1a1a1a] md:text-lg">
                          {entry.organization}
                        </h3>
                        <p className="mt-1 text-sm italic text-[#666]">
                          {entry.role}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-[#666]">
                          • {entry.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <p className="text-sm text-[#1a1a1a]">{entry.period}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
