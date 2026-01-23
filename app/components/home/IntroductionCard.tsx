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
                    <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/10 to-black/10"></div>
                </div>
                <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                        <p className="w-full font-serif text-base font-bold text-white sm:w-3/4 md:w-1/2 md:text-lg lg:text-xl">
                            A tennis lover turned software developer, bringing passion and precision to make positive impact on the tennis industry for future generations.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
