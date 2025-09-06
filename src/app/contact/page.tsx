"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/main/MainLayout";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <MainLayout>
      <section className="w-full max-w-lg bg-card border border-border rounded-xl p-8 shadow">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">
          Contact Us
        </h2>
        {sent ? (
          <div className="text-center text-green-600 font-semibold">
            Thank you for reaching out! We’ll get back to you soon.
          </div>
        ) : (
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <Input required placeholder="Your Name" />
            <Input required type="email" placeholder="Your Email" />
            <Textarea required placeholder="Your Message" rows={5} />
            <Button type="submit" className="mt-2">
              Send Message
            </Button>
          </form>
        )}
      </section>
    </MainLayout>
  );
}
