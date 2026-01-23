import { Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1200px] border-t border-[#E5E5E5] px-6 py-12 md:px-8">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-sm text-[#666]">
          © {new Date().getFullYear()} Tomoyuki Fujii. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-sm text-[#666] transition-colors hover:text-[#3B82F6]"
          >
            <Linkedin size={24} color="#1A1A1A" strokeWidth={1.5} />
          </a>
          <a
            href="#"
            className="text-sm text-[#666] transition-colors hover:text-[#3B82F6]"
          >
            <Github size={24} color="#1A1A1A" strokeWidth={1.5} />
          </a>
          <a
            href="#"
            className="text-sm text-[#666] transition-colors hover:text-[#3B82F6]"
          >
            <Mail size={24} color="#1A1A1A" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
