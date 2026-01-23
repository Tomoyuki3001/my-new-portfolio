"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PageHero from "../PageHero";
import eating from "@/public/eat.jpg";
import running from "@/public/run.jpg";
import triathlon from "@/public/triathlon.jpg";
import hollywood from "@/public/hollywood.jpg";

const photos = [
  {
    id: 1,
    src: eating,
    alt: "Photo 1",
    description: "Izakaya vibe",
  },
  {
    id: 2,
    src: running,
    alt: "Photo 2",
    description: "Before 21K run...",
  },
  {
    id: 3,
    src: hollywood,
    alt: "Photo 3",
    description: "First time in the US",
  },
  {
    id: 4,
    src: triathlon,
    alt: "Photo 4",
    description: "Yokohama triathlon",
  },
];

export default function AboutHero() {
  return (
    <>
      <PageHero title="About Me" />
      <section className="mx-auto max-w-[1100px] px-12 pb-16 md:px-20 lg:px-24">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg border border-[#E5E5E5] bg-gray-100">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <p className="mt-2 text-center text-sm font-medium text-gray-700">
                {photo.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
