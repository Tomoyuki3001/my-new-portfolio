"use client";

import { motion } from "framer-motion";

interface Project {
  title: string;
  link: string;
  description: string;
  technologies: string[];
}

interface TechnologyTag {
  name: string;
  color: string;
}

const technologyColors: Record<string, string> = {
  TypeScript: "bg-blue-400",
  React: "bg-blue-400",
  "Next.js": "bg-gray-500",
  "Node.js": "bg-green-500",
  "Express.js": "bg-yellow-500",
  AWS: "bg-orange-500",
  JavaScript: "bg-yellow-500",
  Supabase: "bg-green-500",
  "Spotify API": "bg-green-400",
  Prisma: "bg-green-400",
  MongoDB: "bg-green-400",
};

export default function ProjectsSection() {
  const projects: Project[] = [
    {
      title: "Workout Tracker",
      link: "https://github.com/Tomoyuki3001/workout-record",
      description: "A workout tracker that allows users to track their workouts and progress. I didn't want to use a pen and notebook at a gym, so I created this app.",
      technologies: ["React", "Express.js", "Node.js", "MongoDB"],
    },
    {
      title: "Health Management Dashboard",
      link: "https://github.com/Tomoyuki3001/mern-health",
      description: "A health management dashboard to book appointments with doctors. Learned about basic MERN application flow and database management.",
      technologies: ["React", "Express.js", "Node.js", "MongoDB"],
    },
    {
      title: "Chat App",
      link: "https://github.com/Tomoyuki3001/mern-chat",
      description: "A chat app that allows users to chat with each other. I wanted to use this app with my ex, but... lol",
      technologies: ["Next.js", "Prisma", "MongoDB"],
    },
  ];

  const getTagColor = (tech: string): string => {
    return technologyColors[tech] || "bg-gray-400";
  };

  return (
    <div className="mt-16 flex flex-col gap-8 sm:mt-24 sm:flex-row sm:gap-12 md:gap-16">
      {/* Left Column - Projects Title */}
      <div className="shrink-0">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-serif text-xl font-bold text-[#1a1a1a] sm:text-2xl md:text-3xl"
        >
          Projects
        </motion.h2>
      </div>

      {/* Right Column - Projects List */}
      <div className="flex-1">
        <div className="space-y-8 sm:space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6 md:gap-8"
            >
              {/* Project Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-[#1a1a1a] transition-colors hover:text-[#bcff4f] sm:text-base md:text-lg">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.title}
                  </a>
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#666] sm:text-sm">
                  {project.description}
                </p>
              </div>

              {/* Technology Tags */}
              <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end md:w-48">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium text-white sm:px-3 sm:py-1 sm:text-xs ${getTagColor(tech)}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
