"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import profileImage from "@/public/me.jpg";

export default function IntroductionCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-lg border border-[#E5E5E5] md:col-span-2 lg:col-span-2"
    >
      <div className="relative h-full min-h-[300px] p-6 sm:min-h-[400px] sm:p-8 md:p-12">
        <div className="absolute inset-0">
          <Image
            src={profileImage}
            alt="Tennis court background"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      </div>
    </motion.div>
  );
}
