import React from "react";
import MainLayout from "@/components/main/MainLayout";

export default function Home() {
  return (
    <MainLayout>
         {/* Hero Section */}
      <section className="max-w-5xl mx-auto flex flex-col items-center justify-center py-24 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-primary">
          Welcome to <span className="text-secondary">EMSxpert</span>
        </h1>
        <p className="text-base md:text-xl text-muted-foreground mb-8">
          Your expert solution for modern emergency management.  
          Fast, reliable, and beautifully designed.
        </p>
        <a
          href="#"
          className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition"
        >
          Get Started
        </a>
      </section>
    </MainLayout>
  );
}
