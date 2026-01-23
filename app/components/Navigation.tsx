"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="mx-auto max-w-[1100px] px-12 py-6 md:px-20 lg:px-24">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E5E5] bg-white">
            <Image
              src="/profile.png"
              alt="Tomoyuki Fujii icon"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </Link>
        <div className="flex gap-8 text-sm font-medium uppercase tracking-wider text-[#666]">
          <Link
            href="/"
            className={`transition-colors hover:text-[#1a1a1a] ${pathname === "/" ? "text-[#1a1a1a]" : ""
              }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`transition-colors hover:text-[#1a1a1a] ${pathname === "/about" ? "text-[#1a1a1a]" : ""
              }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`transition-colors hover:text-[#1a1a1a] ${pathname === "/contact" ? "text-[#1a1a1a]" : ""
              }`}
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
