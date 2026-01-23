import { Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1100px] flex flex-col items-center px-12 py-12 md:px-20 lg:px-24">
      <div className="flex gap-6">
        <a
          href="#"
        >
          <Linkedin size={24} color="#1A1A1A" strokeWidth={1.5} />
        </a>
        <a
          href="#"
        >
          <Github size={24} color="#1A1A1A" strokeWidth={1.5} />
        </a>
        <a
          href="#"
        >
          <Mail size={24} color="#1A1A1A" strokeWidth={1.5} />
        </a>
      </div>
      <p className="text-sm text-[#666] mt-6">
        © {new Date().getFullYear()} Tomoyuki Fujii. All rights reserved.
      </p>
    </footer >
  );
}
