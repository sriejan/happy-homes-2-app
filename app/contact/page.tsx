import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { H2 } from "@/components/ui/typography";
import ContactForm from "./ui/ContactForm";

export const metadata = {
  title: "Contact • Happy Homes 2.0",
  description: "Reach out to our team for support, partnerships, or queries.",
};

export default function ContactPage() {
  return (
    <main className="kk-section">
      <div className="container mx-auto px-4">
        <H2 asChild withDivider><h1 className="text-ink">Contact Us</h1></H2>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ContactForm />
          <aside className="space-y-3">
            <div>
              <div className="font-medium">Email</div>
              <div className="text-neutral-700">hello@happyhomes.com</div>
            </div>
            <div>
              <div className="font-medium">Phone</div>
              <div className="text-neutral-700">+1 (555) 123-4567</div>
            </div>
            <div>
              <div className="font-medium">Address</div>
              <div className="text-neutral-700">123 Craft Street, Artisan District</div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}


