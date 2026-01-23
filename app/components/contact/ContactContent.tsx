"use client";

import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

export default function ContactContent() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-24 md:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <ContactForm />
        <ContactInfo />
      </div>
    </section>
  );
}
