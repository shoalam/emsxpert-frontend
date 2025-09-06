import React from 'react'
import { CheckCircle, Bell, Users, BarChart2, Workflow } from "lucide-react";
import MainLayout from '@/components/main/MainLayout';

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
    icon: BarChart2,
  },
  {
    title: "Customizable Workflows",
    description: "Adapt the system to your unique emergency protocols.",
    icon: Workflow,
  },
];

export default function FeaturesPage() {
  return (
    <MainLayout>
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
