"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Music, Facebook, FileText } from "lucide-react";

interface ContactCard {
  icon: React.ReactNode;
  platform: string;
  identifier: string;
  href?: string;
}

export default function ContactInfo() {
  const contactCards: ContactCard[] = [
    {
      icon: <Linkedin size={24} color="#1A1A1A" strokeWidth={1.5} />,
      platform: "LinkedIn",
      identifier: "in/tomoyuki-fujii",
      href: "https://www.linkedin.com/in/tomoyuki-fujii",
    },
    {
      icon: <Mail size={24} color="#1A1A1A" strokeWidth={1.5} />,
      platform: "Email",
      identifier: "mjr013008@gmail.com",
      href: "mailto:mjr013008@gmail.com",
    },
    {
      icon: <Github size={24} color="#1A1A1A" strokeWidth={1.5} />,
      platform: "GitHub",
      identifier: "Tomoyuki3001",
      href: "https://github.com/Tomoyuki3001",
    },
    {
      icon: <Facebook size={24} color="#1A1A1A" strokeWidth={1.5} />,
      platform: "Facebook",
      identifier: "Tomoyuki Fujii",
      href: "https://www.facebook.com/tomoyk113",
    },
    {
      icon: <Music size={24} color="#1A1A1A" strokeWidth={1.5} />,
      platform: "Spotify",
      identifier: "Tomoyuki Fujii",
      href: "https://open.spotify.com/user/tmyk0130?si=9a8d1d3c89b14b32",
    },
    {
      icon: <FileText size={24} color="#1A1A1A" strokeWidth={1.5} />,
      platform: "Strava",
      identifier: "Tomoyuki Fujii",
      href: "https://www.strava.com/athletes/157193350",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-8"
    >
      {contactCards.map((card, index) => {
        const CardContent = (
          <div className="flex items-start gap-4 rounded-lg border border-[#E5E5E5] bg-white p-4 transition-all hover:border-[#bcff4f]">
            <div className="flex-shrink-0">{card.icon}</div>
            <div className="flex-1">
              <h3 className="mb-1 font-semibold text-[#1a1a1a]">{card.platform}</h3>
              <p className="text-sm text-[#1a1a1a]">{card.identifier}</p>
            </div>
          </div>
        );

        return card.href ? (
          <a
            key={index}
            href={card.href}
            target={card.href.startsWith("http") ? "_blank" : undefined}
            rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="block"
          >
            {CardContent}
          </a>
        ) : (
          <div key={index}>{CardContent}</div>
        );
      })}
    </motion.div>
  );
}
