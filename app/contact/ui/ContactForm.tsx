"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const form = useForm<FormValues>({ resolver: zodResolver(schema) });
  const [submitting, setSubmitting] = React.useState(false);

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      toast.success("Thanks! We'll get back to you soon.");
      form.reset();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
      <Field label="Name" error={form.formState.errors.name?.message}>
        <input className="w-full border rounded-xl px-3 py-2" placeholder="Your name" {...form.register("name")} />
      </Field>
      <Field label="Email" error={form.formState.errors.email?.message}>
        <input className="w-full border rounded-xl px-3 py-2" placeholder="you@example.com" type="email" {...form.register("email")} />
      </Field>
      <Field label="Message" error={form.formState.errors.message?.message}>
        <textarea className="w-full border rounded-xl px-3 py-2 h-32" placeholder="How can we help?" {...form.register("message")} />
      </Field>
      <div className="pt-2">
        <Button type="submit" disabled={submitting}>{submitting ? "Sending…" : "Send message"}</Button>
      </div>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-sm font-medium mb-1">{label}</div>
      {children}
      {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
    </label>
  );
}


