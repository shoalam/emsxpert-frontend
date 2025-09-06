import React from "react";
import MainLayout from "@/components/main/MainLayout";
import { BarChart, BarChart2, Bell, Users, Workflow } from "lucide-react";

export default function Home() {
  const features = [
  {
    title: "Real-time Alerts",
    description: "Instant notifications for emergencies and critical updates.",
    icon: Bell,
  },
  {
    title: "User Management",
    description: "Easily manage users, roles, and permissions.",
    icon: Users,
  },
  {
    title: "Analytics Dashboard",
    description: "Visualize key metrics and trends with interactive charts.",
    icon: BarChart,
  },
  {
    title: "Customizable Workflows",
    description: "Adapt the system to your unique emergency protocols.",
    icon: Workflow,
  },
];
  return (
    <MainLayout>
         {/* Hero Section */}
      <section className="max-w-5xl mx-auto flex flex-col items-center justify-center py-24 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-primary">
          Welcome to <span className="text-blue-500">EMSxpert</span>
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
      <section className="max-w-4xl mx-auto py-20 px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 text-primary">Features</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-card border border-border rounded-lg p-6 shadow hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-2">
                <feature.icon className="text-black w-6 h-6" />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
